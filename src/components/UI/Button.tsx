import { type FC, type ButtonHTMLAttributes } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../../util/utils";

const buttonVariant = cva("inline-flex items-center justify-center", {
  variants: {
    variant: { outline: "bg-transparent", default: "bg-lightBlue" },
    size: {
      default: "h-10 py-2 px-4 outline-none",
      sm: "h-9 px-2 rounded-md outline-none",
    },
  },
  defaultVariants: {},
});

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariant>;

const Button: FC<ButtonProps> = ({ variant, size, className, ...props }) => {
  return <button className={cn(buttonVariant({ variant, size }), className)} {...props}></button>;
};

export default Button;
