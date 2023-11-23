import { VariantProps, cva } from "class-variance-authority";

export type basicVariantColorType = VariantProps<typeof basicVariant>["color"];
export type basicVariantSizeType = VariantProps<typeof basicVariant>["size"];

export const basicVariant = cva("w-10 h-10", {
  variants: {
    color: {
      default: "text-white",
      purple: "text-darkPurple",
      red: "text-lightRed",
      yellow: "text-orangeYellow",
      green: "text-lightGreen",
      blue: "text-lightBlue",
      gray: "text-textPrimary",
    },
    size: {
      default: "w-10 h-10",
      s0: "w-4 h-4",
      s1: "w-6 h-6",
      s1_5: "w-8- h-8",
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
    box: {
      default:
        "bg-white dark:bg-primary w-10 h-10 drop-shadow-[0_0px_15px_rgba(0,0,0,0.09)] dark:drop-shadow-[0_0px_15px_rgba(0,0,0,0.9)] rounded-xl duration-200",
      littleShadow:
        "bg-white dark:bg-primary w-10 h-10 drop-shadow-[0_0px_15px_rgba(0,0,0,0.07)] dark:drop-shadow-[0_2px_15px_rgba(0,0,0,0.3)] rounded-xl duration-200",
    },
  },
  defaultVariants: {
    color: "default",
    size: "default",
  },
});
