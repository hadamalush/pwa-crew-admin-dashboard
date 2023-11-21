import { useForm } from "react-hook-form";
import SelectCreatable from "../../UI/Select/SelectCreatable";
import TextEditor from "../Editor/TextEditor";
import { DUMMY_USERS } from "../dummy-items";
import { useState, useEffect, type ComponentPropsWithoutRef } from "react";
import * as yup from "yup";
import Button from "../../UI/Button";
import { cn } from "../../../util/utils";

type OptionType = { label: string; value: string };

type UserType = {
  email: string;
};

type NewMessageProps = {
  subject?: string;
  email?: string;
} & ComponentPropsWithoutRef<"form">;

const emailSchema = yup.string().email().required();

const validateEmail = (email: string) => {
  return emailSchema.isValidSync(email);
};

const NewMessage = ({ subject, email, ...props }: NewMessageProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [emailOptions, setEmailOptions] = useState<OptionType[]>([]);
  const [text, setText] = useState("");
  const [emails, setEmails] = useState<string[]>([]);

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

  const handleSendMessage = () => {
    if (emails.length <= 0) {
      // errors = { ...errors };
    }

    //backend handling..
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
      <div className="bg-transparent mx-6 overflow-hidden mt-6 ">
        <input
          {...register("subject", {
            required: "Subject is required",
            minLength: { value: 4, message: "The subject should contain at least 4 characters" },
          })}
          placeholder="Subject"
          autoComplete="off"
          defaultValue={subject}
          className="block w-full py-2 px-4 rounded-md dark:bg-primary border dark:border-borderPrimary border-secondaryLight dark:text-textPrimary text-black overflow-hidden
           placeholder-textPrimary outline-none focus:border-blueFocus focus:border-2 dark:focus:border-blueFocus dark:focus:border"
        />
      </div>

      <p className="px-7 text-lightRed py-2">
        {errors.subject?.message &&
          typeof errors.subject.message === "string" &&
          errors.subject.message}
      </p>

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
