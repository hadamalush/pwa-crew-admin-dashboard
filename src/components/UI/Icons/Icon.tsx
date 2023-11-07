import React from "react";
import { IconsBase, type IconNameType } from "./IconBase";
import { cn } from "../../../util/utils";
import { VariantProps, cva } from "class-variance-authority";

const iconVariants = cva("w-10 h-10", {
  variants: {
    color: {
      default: "text-white",
      purple: "text-darkPurple",
      red: "text-lightRed",
      yellow: "text-orangeYellow",
      green: "text-lightGreen",
      blue: "text-lightBlue",
    },
    size: {
      default: "w-10 h-10",
      s1: "w-6 h-6",
      s2: "w-10 h-10",
      s3: "w-12 h-12",
      s4: "w-14 h-14",
      s5: "w-16 h-16",
      s6: "w-20 h-20",
      s7: "w-24 h-24",
      s8: "w-32 h-32",
      s9: "w-40 h-40",
      s10: "w-96 h-96",
      sFull: "w-full h-full",
    },
  },
  defaultVariants: {
    color: "default",
    size: "default",
  },
});

export type iconColor = VariantProps<typeof iconVariants>["color"];
// export type iconColorOnly = iconColor["color"];

type IconProps = VariantProps<typeof iconVariants> & {
  iconName: IconNameType;
  className?: string;
};

// interface IconProps1 extends VariantProps<typeof iconVariants> {
//   iconName: IconNameType;
//   className?: string;
// }

const Icon = ({ iconName, size, color, className }: IconProps) => {
  const IconWithClass = React.cloneElement(IconsBase[iconName], {
    className: cn(iconVariants({ color, size, className })),
  });
  return IconWithClass;
};

export default Icon;
