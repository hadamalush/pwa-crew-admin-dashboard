import { forwardRef, ComponentPropsWithoutRef } from "react";

type InputProps = {
  id: string;
} & ComponentPropsWithoutRef<"input">;

const InputRef = forwardRef<HTMLInputElement, InputProps>(function Input({ id, ...props }, ref) {
  return <input id={id} name={id} {...props} ref={ref} />;
});

export default InputRef;
