import Container from "../../UI/Container";
import Icon from "../../UI/Icons/Icon";
import Heading from "../../UI/Heading";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "../../../util/utils";
import { IconNameType } from "../../UI/Icons/IconBase";
import Button from "../../UI/Button";
// import { API_URL } from "../../../config/config";
// import axios from "axios";
import useAxiosPrivate from "../../../hooks/usePrivateAxios";
import { toast } from "sonner";

type CardStatsProps = {
  title: string;
  quantity: number;
  percentages: number;
  iconName: IconNameType;
} & ComponentPropsWithoutRef<"div">;

const CardStats = ({ title, quantity, percentages, iconName, ...props }: CardStatsProps) => {
  const isMinusPercentage = percentages < 0 ? true : false;
  const axiosPrivate = useAxiosPrivate();

  const handleFetchData = async () => {
    try {
      const response = await axiosPrivate.get("/admin/stats/mongoConnections");
      console.log(response);
    } catch (err) {
      toast.error("Something went wrong, please try again later");
    }
  };

  return (
    <Container as="div" variant="default" className={cn("w-full h-72 flex", props.className)}>
      <div className="flex flex-wrap w-full pl-10 items-center">
        <Icon
          iconName={iconName}
          size={"s2"}
          className="mxs:w-14 mxs:h-14 text-gray dark:text-white "
        />
        <strong className=" ml-2 text-2xl mxs:text-3xl text-gray dark:text-white ">
          {quantity}
        </strong>
        <p
          className={cn(
            "ml-2 w-3/6 mxs:w-7/12 xs:w-3/4 sm:w-8/12 lg:w-9/12 xlg:w-7/12 xl:w-8/12 text-lightGreen",
            { "text-lightRed": isMinusPercentage }
          )}
        >
          {!isMinusPercentage && "+"}
          {percentages}%
        </p>

        <Heading as="h4" className="mt-10 text-black font-semibold dark:text-white">
          {title}
        </Heading>
      </div>

      <Button
        className="self-end p-2 mr-7 mb-7 bg-slate-200 dark:bg-primaryLight rounded-2xl flex items-center justify-center cursor-pointer hover:bg-slate-300
       dark:hover:bg-navItemActive duration-200"
        onClick={handleFetchData}
      >
        <Icon iconName="arrowBottomRight" size="s3" color="blue" className="block " />
      </Button>
    </Container>
  );
};

export default CardStats;
