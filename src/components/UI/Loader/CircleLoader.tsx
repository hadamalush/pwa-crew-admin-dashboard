import { ComponentPropsWithoutRef } from "react";
import { cn } from "../../../util/utils";
import styles from "./CircleLoaderClass.module.css";

const CircleLoader = ({ className, ...props }: ComponentPropsWithoutRef<"span">) => {
  return <span className={cn(styles.loaderCircle, className)} {...props}></span>;
};

export default CircleLoader;
