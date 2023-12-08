import { useForm } from "react-hook-form";
import SelectCreatable from "../../UI/Select/SelectCreatable";
import TextEditor from "../Editor/TextEditor";
import { DUMMY_USERS } from "../dummy-items";
import { useState, useEffect, type ComponentPropsWithoutRef } from "react";
import * as yup from "yup";
import Button from "../../UI/Button";
import { cn } from "../../../util/utils";
import InputText from "../../UI/Input/InputText";
import useAxiosPrivate from "../../../hooks/usePrivateAxios";
import { toast } from "sonner";
import { AxiosError } from "axios";

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

  useEffect(() => {
    const emails = getEmailAddresses(DUMMY_USERS);
    setEmailOptions(emails);
  }, []);

  const handleChangeEmails = (newValue: unknown) => {
    const newEmails = newValue as OptionType[];

    if (newEmails) {
      setEmails(newEmails.map((option) => option.value));
    }
  };

  const handleSendMessage = async () => {
    const subject = getValues("subject");

    try {
      const res = await axiosPrivate.post("/admin/inbox/sendMessage", { text, emails, subject });

      if (res.status === 200) {
        toast.success("Message sent");

        if (closeModal) {
          closeModal();
        }
      }
    } catch (err) {
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
        defaultInputValue={email}
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
