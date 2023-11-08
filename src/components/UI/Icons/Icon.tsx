import React from "react";
import { IconsBase, type IconNameType } from "./IconBase";
import { cn } from "../../../util/utils";
import { VariantProps } from "class-variance-authority";
import { basicVariant } from "../../variants/variants";

type IconProps = VariantProps<typeof basicVariant> & {
  iconName: IconNameType;
  className?: string;
};

const Icon = ({ iconName, size, color, className }: IconProps) => {
  const IconWithClass = React.cloneElement(IconsBase[iconName], {
    className: cn(basicVariant({ color, size, className })),
  });
  return IconWithClass;
};

export default Icon;
