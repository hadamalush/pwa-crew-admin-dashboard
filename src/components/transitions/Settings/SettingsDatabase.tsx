import { cn } from "../../../util/utils";
import Button from "../../UI/Button";

import Heading from "../../UI/Heading";
import { type ReactNode, type ComponentPropsWithoutRef } from "react";

type SettingsToolProps = {
  title: string;
  children: ReactNode;
  btnClass?: string;
} & ComponentPropsWithoutRef<"div">;

const SettingsTool = ({ title, children, btnClass, className }: SettingsToolProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center relative", className)}>
      <Heading as="h3" className="my-20 dark:text-white text-2xl w-3/4 md:w-1/2  text-center">
        {title}
      </Heading>
      {children}
      <Button
        variant="default"
        size="big"
        className={cn("mb-20 mt-5 w-full", btnClass)}
        type="submit"
      >
        Confirm
      </Button>
    </div>
  );
};

export default SettingsTool;
