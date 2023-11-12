import Container from "../../UI/Container";
import Heading from "../../UI/Heading";
import { Doughnut } from "react-chartjs-2";
import { ComponentPropsWithoutRef, useState } from "react";
import { cn } from "../../../util/utils";
import { type DUMMY_STORAGETYPE } from "../dummy-items";
import SelectSingle from "../../UI/SelectSingle";
import "chart.js/auto";
import { memo } from "react";

type CardStorageProps = {
  dataStorage: DUMMY_STORAGETYPE;
} & ComponentPropsWithoutRef<"div">;

const CardStorage = memo(({ dataStorage, className, ...props }: CardStorageProps) => {
  const [selectedOption, setSelectedOption] = useState("Cloudinary");
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

  type OptionType = { label: string; value: string };
  const optionsSelect: OptionType[] = [
    { value: "cloudinary", label: "Cloudinary" },
    { value: "vercelblob", label: "VercelBlob" },
    { value: "mega", label: "Mega" },
  ];

  const changeSelectHandler = (newValue: unknown | null) => {
    if (newValue) {
      const storage = (newValue as OptionType).label;
      setSelectedOption(storage);
    }
  };

  return (
    <Container
      as="div"
      variant="default"
      className={cn(
        "w-full h-160 flex flex-col justify-start dark:text-white text-black ",
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
      <SelectSingle
        options={optionsSelect}
        onChange={changeSelectHandler}
        className="md:w-3/5 xlg:w-2/5  mt-auto mb-14"
      />
    </Container>
  );
});

export default CardStorage;
