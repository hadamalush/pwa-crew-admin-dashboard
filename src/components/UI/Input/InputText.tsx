import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "../../../util/utils";

type InputTextProps = {
  label?: string;
} & ComponentPropsWithoutRef<"input">;

const InputText = forwardRef<HTMLInputElement, InputTextProps>(function Input(
  { label, ...props },
  ref
) {
  return (
    <>
      {label && <label className="text-white ">{label}</label>}
      <input
        ref={ref}
        className={cn(
          `block w-full py-2 px-4 rounded-md dark:bg-primary border dark:border-borderPrimary border-secondaryLight dark:text-textPrimary text-black overflow-hidden
           placeholder-textPrimary outline-none focus:border-blueFocus focus:border-2 dark:focus:border-blueFocus dark:focus:border my-2`,
          props.className
        )}
        {...props}
      />
    </>
  );
});

export default InputText;
