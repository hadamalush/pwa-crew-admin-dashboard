import { type ElementType, type ReactNode, type ComponentPropsWithoutRef } from "react";
import { cn } from "../../util/utils";
import { VariantProps, cva } from "class-variance-authority";
import { basicVariant } from "../variants/variants";

const containterVariant = cva("flexCenter", {
  variants: {
    variant: {
      default: basicVariant({ box: "default" }),
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
