import Container from "../../UI/Container";
import { Doughnut } from "react-chartjs-2";
import Heading from "../../UI/Heading";
import Select from "react-select";
import "chart.js/auto";
import { ComponentPropsWithoutRef, useState } from "react";
import useTheme from "../../../hooks/useTheme";
import { DUMMY_STORAGETYPE } from "../dummy-items";
import { cn } from "../../../util/utils";

type CardStorageProps = {
  dataStorage: DUMMY_STORAGETYPE;
} & ComponentPropsWithoutRef<"div">;

const CardStorage = ({ dataStorage, className, ...props }: CardStorageProps) => {
  const [selectedOption, setSelectedOption] = useState("Cloudinary");
  const { theme } = useTheme();
  const transformedOption = selectedOption.toLocaleLowerCase();

  const data = {
    labels: ["Used disk space", "Free disk space"],
    datasets: [
      {
        labels: transformedOption,
        data: dataStorage[transformedOption].data,
        backgroundColor: [dataStorage[transformedOption].color, "#00d25b"],
        borderColor: "none",
        borderWidth: 0,
        weight: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
    },
    cutout: "65%",
  };

  const optionsSelect = [
    { value: "cloudinary", label: "Cloudinary" },
    { value: "vercelblob", label: "VercelBlob" },
    { value: "mega", label: "Mega" },
  ];

  type OptionType = { label: string; value: string };

  const changeSelectHandler = (values: OptionType | null) => {
    if (values) {
      const storage = (values as OptionType).label;
      setSelectedOption(storage);
    }
  };

  return (
    <Container
      as="div"
      variant="default"
      className={cn(
        "w-full h-160 flex flex-col justify-start dark:text-white text-black",
        className
      )}
      {...props}
    >
      <Heading as="h3" className="p-10 text-3xl font-bold">
        Used disk space
      </Heading>
      <div className="h-96 w-11/12 odd:w-11/12 flex items-center justify-center relative">
        <Heading as="h4" className="h-max absolute font-semibold ">
          {selectedOption}
        </Heading>
        <Doughnut data={data} options={options} />
      </div>

      <Select
        options={optionsSelect}
        placeholder="Select storage"
        onChange={changeSelectHandler}
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
        className="mt-5 w-3/4 text-white"
      />
    </Container>
  );
};

export default CardStorage;
