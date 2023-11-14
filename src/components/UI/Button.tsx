import { type FC, type ButtonHTMLAttributes } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../../util/utils";

const buttonVariant = cva("inline-flex items-center justify-center", {
  variants: {
    variant: {
      default:
        "bg-lightBlue hover:bg-darkBlue duration-200 py-4 text-center rounded-md block text-white font-semiBold outline-none",
      outline: "bg-transparent outline-none",
      pill: "font-semibold text-base py-2 px-5 border-pLight rounded-full border hover:bg-gray-slate-200 hover:bg-lightBlue/[0.3] duration-200",
    },
    size: {
      default: "h-10 py-2 px-4 ",
      sm: "h-9 px-2 rounded-md ",
      big: "md:py-5 md:px-14 md:text-2xl",
    },
  },
  defaultVariants: {},
});

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariant>;

const Button: FC<ButtonProps> = ({ variant, size, className, ...props }) => {
  return <button className={cn(buttonVariant({ variant, size }), className)} {...props}></button>;
};

export default Button;
