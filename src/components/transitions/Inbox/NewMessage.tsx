import SelectCreatable from "../../UI/Select/SelectCreatable";
import TextEditor from "../Editor/TextEditor";
import { DUMMY_USERS } from "../dummy-items";
import { useState, useEffect } from "react";
import * as yup from "yup";

type OptionType = { label: string; value: string };

type UserType = {
  email: string;
};

const emailSchema = yup.string().email().required();

const validateEmail = (email: string) => {
  return emailSchema.isValidSync(email);
};

const NewMessage = () => {
  const [emailOptions, setEmailOptions] = useState<OptionType[]>([]);
  const [text, setText] = useState("");
  const [emails, setEmails] = useState<string[]>([]);

  console.log(emails);

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

  return (
    <>
      <SelectCreatable
        className="mx-6 mt-5"
        options={emailOptions}
        isValidNewOption={validateEmail}
        onChange={handleChangeEmails}
      />
      <TextEditor onChange={setText} value={text} />
    </>
  );
};

export default NewMessage;

const getEmailAddresses = <T extends UserType>(users: T[]): OptionType[] => {
  const emails = users.map((user) => {
    return { value: user.email, label: user.email };
  });

  return emails;
};
