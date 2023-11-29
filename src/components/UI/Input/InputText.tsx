import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "../../../util/utils";
import { FieldErrors } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";

type InputTextProps = {
  label?: string;
  errors?: FieldErrors;
  id: string;
  labelClass?: string;
} & ComponentPropsWithoutRef<"input">;

const InputText = forwardRef<HTMLInputElement, InputTextProps>(function Input(
  { label, labelClass, errors, id, className, ...props },
  ref
) {
  return (
    <>
      {label && (
        <label htmlFor={id} className={cn("dark:text-white text-black mt-10 block ", labelClass)}>
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        {...props}
        autoComplete="off"
        className={cn(
          `block w-full py-2 px-4 rounded-md dark:bg-primary border dark:border-borderPrimary border-secondaryLight dark:text-textPrimary text-black overflow-hidden
           placeholder-textPrimary outline-none focus:border-blueFocus focus:border-2 dark:focus:border-blueFocus dark:focus:border `,
          className
        )}
      />
      <AnimatePresence>
        {errors && errors[id] && (
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0 }}
            className=" text-lightRed absolute text-2xl"
          >
            {errors[id]?.message as string}
          </motion.p>
        )}
      </AnimatePresence>
    </>
  );
});

export default InputText;
