import { ComponentPropsWithoutRef } from "react";
import { cn } from "../../../util/utils";
import styles from "./DotsLoader.module.css";

const DotsLoader = ({ className, ...props }: ComponentPropsWithoutRef<"span">) => {
  return <span className={cn(styles.dotsLoader, className)} {...props}></span>;
};

export default DotsLoader;
