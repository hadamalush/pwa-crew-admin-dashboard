import { type ElementType, type ReactNode, type ComponentPropsWithoutRef } from "react";
import { cn } from "../../util/utils";
import { VariantProps, cva } from "class-variance-authority";

const containterVariant = cva("flexCenter", {
  variants: {
    variant: {
      default:
        "bg-white dark:bg-primary w-10 h-10 drop-shadow-[0_0px_15px_rgba(0,0,0,0.07)] dark:drop-shadow-[0_0px_15px_rgba(0,0,0,0.9)] rounded-xl duration-200",
      flex: "flex w-full",
      grid: "grid w-full",
      wrapper: "p-10 w-full h-full text-white justify-start flex-col gap-y-10",
    },
  },
});

type ContainerProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
} & ComponentPropsWithoutRef<T> &
  VariantProps<typeof containterVariant>;

const Container: <C extends ElementType>(props: ContainerProps<C>) => JSX.Element = ({
  as: Component = "div",
  children,
  variant,
  className,
  ...props
}) => {
  return (
    <Component className={cn(containterVariant({ variant }), className)} {...props}>
      {children}
    </Component>
  );
};

export default Container;
