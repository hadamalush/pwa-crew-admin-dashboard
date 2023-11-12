import useTheme from "../../hooks/useTheme";
import Select from "react-select";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "../../util/utils";

type SelectSingleProps = ComponentPropsWithoutRef<typeof Select>;

const SelectSingle = ({ className, ...props }: SelectSingleProps) => {
  const { theme } = useTheme();

  return (
    <Select
      {...props}
      placeholder="Select storage"
      styles={{
        control: (base, state) => {
          state.theme.colors = {
            ...state.theme.colors,
            primary: theme === "dark" ? "#2a2d3a" : "#e2e8f0", //option hover
            primary25: theme === "dark" ? "#0f1015" : "#cbd5e1", //option hover & focus
            primary50: theme === "dark" ? "#0f1015" : "#cbd5e1", //option hover & !focus
            neutral0: theme === "dark" ? "white" : "black", // option font color
            neutral20: theme === "dark" ? "#2f2e33" : "#c9c9c980", // border input
            neutral30: theme === "dark" ? "#c9c9c980" : "#cac7c7", //border hover input
            neutral40: theme === "dark" ? "#c9c9c980" : "#2f2e33", // indicator hover
            neutral60: theme === "dark" ? "#cac7c7" : "#cac7c7", // indicator with focus
            neutral80: "#6c7293", // font color inside input + indicator with hover
          };
          base.cursor = "pointer";

          return {
            ...base,
            backgroundColor: `${theme === "dark" && "primaryColor"}`,
          };
        },
        option: (state) => ({ ...state, cursor: "pointer" }),
        menu: (base) => ({
          ...base,
          backgroundColor: `${theme === "dark" && "primaryColor"}`,
          color: `${theme === "dark" ? "white" : "black"}`,
          cursor: "pointer",
        }),
      }}
      className={cn("mt-5 w-3/4 text-white z-50", className)}
    />
  );
};

export default SelectSingle;
