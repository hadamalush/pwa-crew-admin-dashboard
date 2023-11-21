import { type messageDetailsType } from "../../../global/message-slice";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "../../../util/utils";
import Avatar from "../Avatar";
import Container from "../../UI/Container";
import { format } from "date-fns";

type MessageItemDetailsProps = {
  avatarSrc: string;
  date: string;
  description: string;
  email: string;
  owner: string;
};

type MessageItemDetails = {
  message: messageDetailsType;
} & ComponentPropsWithoutRef<"li">;

const MessageItemDetails = ({
  avatarSrc,
  date,
  description,
  email,
  owner,
}: MessageItemDetailsProps) => {
  //   const { avatarSrc, date, description, email, owner } = message;

  const convertedDate = new Date(date);
  const formattedDate = format(convertedDate, "yyyy-MM-dd");
  const time = format(convertedDate, "HH:mm");

  console.log(formattedDate, time);
  return (
    <li
      className={cn(
        `flex  w-full mx-auto text-xl xlg:text-2xl text-black dark:text-textPrimary px-5 border-pLight dark:border-borderPrimary border-b
py-6 md:px-10 `
      )}
    >
      <Avatar src={avatarSrc} size="s5" />
      <Container className="flex-col justify-start w-10/12 md:w-11/12 relative">
        <h2 className="text-2xl px-4 font-semibold mr-auto text-black dark:text-textPrimary flex">
          <p>{owner}</p>
          <pre className="font-light"> &lt; {email} &gt;</pre>
        </h2>
        <p className="text-2xl px-4 pt-4">{description}</p>
        <p className="absolute right-6 top-[-2rem]">
          <time dateTime={formattedDate}>{formattedDate},</time>
          <time dateTime={time}> {time}</time>
        </p>
      </Container>
    </li>
  );
};

export default MessageItemDetails;
