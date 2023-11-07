import React from "react";
import { IconsBase, type IconNameType } from "./IconBase";
import { cn } from "../../../util/utils";

type IconProps = {
  iconName: IconNameType;
  className?: string;
};

const Icon = ({ iconName, className }: IconProps) => {
  const IconWithClass = React.cloneElement(IconsBase[iconName], {
    className: cn("w-10 h-10", className),
  });
  return IconWithClass;
};

export default Icon;
