import Container from "../../UI/Container";
import { Doughnut } from "react-chartjs-2";
import Heading from "../../UI/Heading";
import "chart.js/auto";

const CardStorage = () => {
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
    </Container>
  );
};

export default CardStorage;
