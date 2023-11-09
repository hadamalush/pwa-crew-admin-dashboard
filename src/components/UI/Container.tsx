import { type ElementType, type ReactNode, type ComponentPropsWithoutRef } from "react";
import { cn } from "../../util/utils";
import { VariantProps, cva } from "class-variance-authority";

const containterVariant = cva("flexCenter", {
  variants: {
    variant: {
      default: "bg-white dark:bg-primary w-10 h-10",
      wrapper: "p-10 w-full h-full text-white",
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
  ...props
}) => {
  return (
    <Component className={cn(containterVariant({ variant }), props.className)} {...props}>
      {children}
    </Component>
  );
};

export default Container;
