import CreatableSelect from "react-select/creatable";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "../../../util/utils";
import "./SelectCreatable.scss";

type CreatableSelectProps = ComponentPropsWithoutRef<typeof CreatableSelect>;

const SelectCreatable = ({ className, ...props }: CreatableSelectProps) => {
  return (
    <CreatableSelect
      isMulti
      openMenuOnFocus
      classNamePrefix="own"
      placeholder="Choose an email from the list or enter some email"
      className={cn("own", className)}
      {...props}
    />
  );
};

export default SelectCreatable;
