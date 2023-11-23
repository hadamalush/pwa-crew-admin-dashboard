import Select from "react-select";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "../../../util/utils";
import "./SelectCreatable.scss";

type SelectSingleProps = ComponentPropsWithoutRef<typeof Select>;

const SelectSingle = ({ className, ...props }: SelectSingleProps) => {
  return (
    <Select
      {...props}
      menuPortalTarget={document.body}
      classNamePrefix="own"
      className={cn("own mt-5 w-3/4 text-white z-50", className)}
      defaultMenuIsOpen={true}
    />
  );
};

export default SelectSingle;
