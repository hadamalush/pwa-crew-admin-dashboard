import Container from "../../UI/Container";
import { Doughnut } from "react-chartjs-2";
import Heading from "../../UI/Heading";
import Select from "react-select";
import "chart.js/auto";
// import { useState } from "react";

const CardStorage = () => {
  // const [selectedOption, setSelectedOption] = useState(null);
  const data = {
    labels: ["Used disk space", "Free disk space"],
    datasets: [
      {
        labels: "cloudinary",
        data: [32, 7],
        backgroundColor: ["#0090e7", "#00d25b"],
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

  const options1 = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <Container
      as="div"
      variant="default"
      className="w-full h-160 flex flex-col justify-start dark:text-white text-black"
    >
      <Heading as="h3" className="p-10 text-3xl font-bold">
        Used disk space
      </Heading>
      <div className="h-96 w-11/12 odd:w-11/12 flex items-center justify-center relative">
        <Heading as="h4" className="h-max absolute font-semibold">
          Cloudinary
        </Heading>
        <Doughnut data={data} options={options} />
      </div>

      {/* <Select
        defaultValue={selectedOption}
        options={options1}
        className="mt-auto mb-14 w-96 text-black"
      /> */}
    </Container>
  );
};

export default CardStorage;
