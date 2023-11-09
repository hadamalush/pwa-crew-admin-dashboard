import { type FC, type ButtonHTMLAttributes } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../../util/utils";

const buttonVariant = cva("inline-flex items-center justify-center", {
  variants: {
    variant: { outline: "bg-transparent outline-none", default: "bg-lightBlue outline-none" },
    size: {
      default: "h-10 py-2 px-4 ",
      sm: "h-9 px-2 rounded-md ",
    },
  },
  defaultVariants: {},
});

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariant>;

const Button: FC<ButtonProps> = ({ variant, size, className, ...props }) => {
  return <button className={cn(buttonVariant({ variant, size }), className)} {...props}></button>;
};

export default Button;
