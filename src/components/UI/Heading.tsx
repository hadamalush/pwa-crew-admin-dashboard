import { ReactNode, HTMLAttributes } from "react";

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: ReactNode;
};

const Heading = ({ as: Component = "h1", children, ...props }: HeadingProps) => {
  return <Component {...props}>{children}</Component>;
};

export default Heading;
