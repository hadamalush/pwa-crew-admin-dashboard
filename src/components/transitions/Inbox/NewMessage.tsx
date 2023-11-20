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

  useEffect(() => {
    const emails = getEmailAddresses(DUMMY_USERS);
    setEmailOptions(emails);
  }, []);

  return (
    <>
      <SelectCreatable
        className="mx-6 mt-5"
        options={emailOptions}
        isValidNewOption={validateEmail}
      />
      <TextEditor />
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
