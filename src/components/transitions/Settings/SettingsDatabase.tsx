import Button from "../../UI/Button";

import Heading from "../../UI/Heading";
import { type ReactNode } from "react";

type SettingsToolProps = {
  title: string;
  children: ReactNode;
};

const SettingsTool = ({ title, children }: SettingsToolProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Heading as="h3" className="my-20 dark:text-white text-2xl">
        {title}
      </Heading>
      {children}
      <Button variant="default" size="big" className="my-20 w-9/12">
        Confirm
      </Button>
    </div>
  );
};

export default SettingsTool;
