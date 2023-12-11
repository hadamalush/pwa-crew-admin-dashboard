import { ComponentPropsWithoutRef } from "react";
import { cn } from "../../../util/utils";
import styles from "./TitleLoader.module.css";

const LoaderTitle = ({ className, ...props }: ComponentPropsWithoutRef<"span">) => {
  return <span className={cn(styles.loaderTitle, className)} {...props}></span>;
};

export default LoaderTitle;
