import { useForm } from "react-hook-form";
import SelectCreatable from "../../UI/Select/SelectCreatable";
import TextEditor from "../Editor/TextEditor";
import { useState, useEffect, type ComponentPropsWithoutRef } from "react";
import * as yup from "yup";
import Button from "../../UI/Button";
import { cn } from "../../../util/utils";
import InputText from "../../UI/Input/InputText";
import useAxiosPrivate from "../../../hooks/usePrivateAxios";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useGlobalDispatch, useGlobalSelector } from "../../../global/hooks";
import { addNewMsgSingle } from "../../../global/message-slice";
import { setLoading } from "../../../global/toggle-slice";

type OptionType = { label: string; value: string };

type UserType = {
  email: string;
};

type NewMessageProps = {
  subject?: string;
  email?: string;
  onClose?: () => void;
} & ComponentPropsWithoutRef<"form">;

const emailSchema = yup.string().email().required();

const validateEmail = (email: string) => {
  return emailSchema.isValidSync(email);
};

const NewMessage = ({ subject, email, onClose: closeModal, ...props }: NewMessageProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [emailOptions, setEmailOptions] = useState<OptionType[]>([]);
  const [text, setText] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useGlobalDispatch();
  const allUsers = useGlobalSelector((state) => state.users.allUsers);

  useEffect(() => {
    const emails = getEmailAddresses(allUsers);
    setEmailOptions(emails);

    if (email) {
      setEmails([email]);
    }
  }, [email, allUsers]);

  const handleChangeEmails = (newValue: unknown) => {
    const newEmails = newValue as OptionType[];

    if (newEmails) {
      setEmails(newEmails.map((option) => option.value));
    }
  };

  const handleSendMessage = async () => {
    dispatch(setLoading({ loading: true }));
    const subject = getValues("subject");

    try {
      const res = await axiosPrivate.post("/admin/inbox/sendMessage", { text, emails, subject });

      if (res.status === 200) {
        const newMsg = {
          id: res?.data,
          owner: "pwacrewcompany@gmail.com",
          subject: subject,
          isFeatured: false,
          unRead: false,
          date: new Date().toISOString(),
          email: "pwacrewcompany@gmail.com",
          description: "",
          isInSpam: false,
          isInTrash: false,
          isInSent: true,
          textHTML: text,
          to: emails[0],
        };

        dispatch(addNewMsgSingle({ message: newMsg }));
        dispatch(setLoading({ loading: false }));
        setText("");
        toast.success("Message sent");

        if (closeModal) {
          closeModal();
          document.body.classList.remove("bodyhidden");
        }
      }
    } catch (err) {
      dispatch(setLoading({ loading: false }));
      const error = err as AxiosError;
      const errMsg = error?.response?.data as string;

      if (errMsg && typeof errMsg === "string") {
        toast.error(errMsg);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <form
      className={cn(" overflow-x-hidden", props.className)}
      onSubmit={handleSubmit(handleSendMessage)}
    >
      <SelectCreatable
        className="mx-6 mt-5"
        options={emailOptions}
        isValidNewOption={validateEmail}
        onChange={handleChangeEmails}
        defaultValue={email && [{ label: email, value: email }]}
      />
      <div className="bg-transparent mx-6 overflow-hidden mt-6 mb-6 ">
        <InputText
          id="subject"
          {...register("subject", {
            required: "Subject is required",
            minLength: { value: 4, message: "At least 4 characters" },
          })}
          aria-label="Subject"
          placeholder="Subject"
          defaultValue={subject}
          errors={errors}
        />
      </div>

      <TextEditor onChange={setText} value={text} />
      <Button type="submit" variant="default" className="w-72 py-2 ml-6 mb-5">
        Send
      </Button>
    </form>
  );
};

export default NewMessage;

const getEmailAddresses = <T extends UserType>(users: T[]): OptionType[] => {
  const emails = users.map((user) => {
    return { value: user.email, label: user.email };
  });

  return emails;
};
