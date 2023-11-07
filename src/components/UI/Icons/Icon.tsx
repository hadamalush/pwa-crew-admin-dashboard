import React from "react";
import { IconsBase, type IconNameType } from "./IconBase";

type IconProps = {
  iconName: IconNameType;
};

const Icon = ({ iconName }: IconProps) => {
  const IconWithClass = React.cloneElement(IconsBase[iconName], {
    className: "w-10 ",
  });
  return IconWithClass;
};

export default Icon;
