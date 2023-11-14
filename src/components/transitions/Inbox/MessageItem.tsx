// import { useState, type MouseEvent } from "react";
import Button from "../../UI/Button";
import Icon from "../../UI/Icons/Icon";
import Avatar from "../Avatar";
import Container from "../../UI/Container";
import { cn } from "../../../util/utils";

export type messageItemProps = {
  id: string;
  owner: string;
  email: string;
  subject: string;
  description: string;
  avatarSrc: string;
  isFeatured: boolean;
  date: Date;
};

interface dataMessage {
  dataMessage: messageItemProps;
}

const MessageItem = ({ dataMessage }: dataMessage) => {
  //   const [isFeatured, setIsFeatured] = useState(false);
  const { id, owner, subject, avatarSrc, isFeatured, date } = dataMessage;

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" }).slice(0, 3);
  const slicedMonth = month.charAt(0).toUpperCase() + month.slice(1, 3);

  const handleCheckbox = () => {
    // const messageId = e.target.id;

    console.log(id);

    // console.log(messageId);
  };

  const handleFeatured = () => {
    // setIsFeatured((prev) => !prev);
    console.log(isFeatured);
  };
  return (
    <li
      className="flex w-full mx-auto  text-xl xlg:text-2xl text-black dark:text-textPrimary px-5 border-pLight dark:border-borderPrimary border-b
   md:py-3 md:px-10"
    >
      <input type="checkbox" id={id} onClick={handleCheckbox} className="cursor-pointer" />

      <Button variant="outline" className="h-max self-center" onClick={handleFeatured}>
        <Icon
          iconName={isFeatured ? "starFilled" : "star"}
          size="s1"
          color="gray"
          className={cn("mx-5 hidden md:block duration-200", {
            "text-orangeYellow": isFeatured,
          })}
        />
      </Button>

      <Avatar src={avatarSrc} size="s2" className="hidden md:block self-center" />

      <Container
        as="div"
        className="w-9/12 xs:w-10/12 md:w-9/12 xlg:w-10/12 xxl:w-11/12 flex-col p-5 items-start"
      >
        <p className="text-ellipsis whitespace-nowrap overflow-hidden w-full">{owner}</p>
        <Container as="div" className="w-full">
          <p className="text-ellipsis whitespace-nowrap overflow-hidden font-semibold w-full">
            {subject}
          </p>
        </Container>
      </Container>
      <Container as="div" className="flex-col mx-auto">
        <time>
          {day} {slicedMonth}
        </time>
        <Button variant="outline" className="h-max self-center" onClick={handleFeatured}>
          <Icon
            iconName={isFeatured ? "starFilled" : "star"}
            size="s1"
            color="gray"
            className={cn("mt-2 md:hidden duration-200", {
              "text-orangeYellow": isFeatured,
            })}
          />
        </Button>
      </Container>
    </li>
  );
};

export default MessageItem;
