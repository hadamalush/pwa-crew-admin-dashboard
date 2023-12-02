import { Bar } from "react-chartjs-2";
import Container from "../../UI/Container";
import "chart.js/auto";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "../../../util/utils";
import Heading from "../../UI/Heading";
import { useMediaQuery } from "react-responsive";
import { getLastWeek } from "../../../global/user-action";
import { useGlobalSelector } from "../../../global/hooks";

type CardUsersStatsProps = ComponentPropsWithoutRef<"div">;

const CardUsersStats = ({ className, ...props }: CardUsersStatsProps) => {
  const isMdScreen = useMediaQuery({ minWidth: 1060 });
  const numberOfUsers = useGlobalSelector((state) => state.stats.users.regUsersLastWeek);

  const labels = getLastWeek();

  const data = {
    labels: labels,

    datasets: [
      {
        label: "New users",
        data: numberOfUsers,
        fill: false,
        responsive: true,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    type: "bar",
    data,
    indexAxis: `${isMdScreen ? "x" : "y"}` as "y" | "x",
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <Container
      as="div"
      variant="default"
      className={cn("w-full h-160 flex-col", className)}
      {...props}
    >
      <Heading as="h3" className="pt-20 font-bold text-3xl dark:text-white text-black md:mt-7">
        Registered users
      </Heading>
      <Bar data={data} options={options} className="pt-10 pb-16 p-10 md:pb-24" />
    </Container>
  );
};

export default CardUsersStats;
