import Container from "../UI/Container";
import Icon from "../UI/Icons/Icon";
import Heading from "../UI/Heading";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "../../util/utils";

type CardProps = {
  title: string;
  quantity: number;
  percentages: number;
} & ComponentPropsWithoutRef<"div">;

const Card = ({ title, quantity, percentages, ...props }: CardProps) => {
  return (
    <Container as="div" variant="default" className={cn("w-full h-72 flex", props.className)}>
      <div className="flex flex-wrap w-full pl-10 items-center">
        <Icon
          iconName="eyeUp"
          size={"s2"}
          className="mxs:w-14 mxs:h-14 text-gray dark:text-white "
        />
        <strong className="w-1/4 ml-2 text-2xl mxs:text-3xl text-gray dark:text-white ">
          {quantity}
        </strong>
        <p className="mr-2 w-2/4 text-lightGreen">+{percentages}%</p>

        <Heading as="h4" className="mt-10 text-black font-semibold dark:text-white">
          {title}
        </Heading>
      </div>

      <span className="self-end p-2 mr-7 mb-7 bg-slate-200 dark:bg-primaryLight rounded-2xl flex items-center justify-center">
        <Icon iconName="arrowBottomRight" size="s3" color="blue" className="block " />
      </span>
    </Container>
  );
};

export default Card;
