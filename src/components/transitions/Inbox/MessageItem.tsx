// import { useState, type MouseEvent } from "react";
import Button from "../../UI/Button";
import Icon from "../../UI/Icons/Icon";
import Avatar from "../Avatar";
import Container from "../../UI/Container";
import { cn } from "../../../util/utils";
import { messageProps } from "../../../global/message-slice";
import { format } from "date-fns";

type dataMessage = {
  dataMessage: messageProps;
};

const MessageItem = ({ dataMessage }: dataMessage) => {
  //   const [isFeatured, setIsFeatured] = useState(false);
  const { id, owner, subject, avatarSrc, isFeatured, isRead, date } = dataMessage;
  const newDate = new Date(date);
  const formattedDate = format(newDate, "dd MMM");

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
      className={cn(
        `flex w-full mx-auto  text-xl xlg:text-2xl text-black dark:text-textPrimary px-5 border-pLight dark:border-borderPrimary border-b
   md:py-3 md:px-10`,
        { "dark:bg-primaryDarkBrighter bg-slate-200": !isRead }
      )}
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
        <p className="text-ellipsis whitespace-nowrap overflow-hidden w-full font-semibold">
          {owner}
        </p>
        <Container as="div" className="w-full">
          <p className="text-ellipsis whitespace-nowrap overflow-hidden w-full">{subject}</p>
        </Container>
      </Container>
      <Container as="div" className="flex-col mx-auto">
        <time>{formattedDate}</time>
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
