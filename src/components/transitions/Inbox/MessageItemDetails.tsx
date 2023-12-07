import { type ComponentPropsWithoutRef, useState } from "react";
import { cn } from "../../../util/utils";
import Avatar from "../Avatar";
import Container from "../../UI/Container";
import { format } from "date-fns";

type MessageItemDetailsProps = {
  avatarSrc: string;
  date: string;
  description: string;
  textHTML: string;
  email: string;
  owner: string;
  textClass?: string;
} & ComponentPropsWithoutRef<"li">;

const MessageItemDetails = ({
  avatarSrc,
  date,
  description,
  textHTML,
  email,
  owner,
  textClass,
  ...props
}: MessageItemDetailsProps) => {
  const [isVisibleMess, setIsVisibleMess] = useState(false);

  const convertedDate = new Date(date);
  const formattedDate = format(convertedDate, "yyyy-MM-dd");
  const time = format(convertedDate, "HH:mm");

  console.log(textHTML);
  console.log(description);

  return (
    <li
      className={cn(
        `flex  w-full mx-auto text-xl xlg:text-2xl text-black dark:text-textPrimary px-5 border-pLight dark:border-borderPrimary border-b
        py-10 md:px-10 cursor-pointer`,
        props.className
      )}
      onClick={() => setIsVisibleMess((prev) => !prev)}
    >
      <Avatar src={avatarSrc ? avatarSrc : "/avatar.webp"} size="s5" />
      <Container className="flex-col justify-start w-10/12 md:w-11/12 relative">
        <h2 className="text-2xl px-4 font-semibold mr-auto text-black dark:text-textPrimary sm:flex">
          <p>{owner}</p>
          <pre className="font-light"> &lt; {email} &gt;</pre>
        </h2>
        <p
          id="description"
          className={cn("text-2xl px-4 pt-4 mr-auto text-ellipsis ", textClass, {
            "whitespace-nowrap overflow-hidden w-11/12 ": !isVisibleMess && textClass,
            "whitespace-normal overflow-auto w-full": isVisibleMess,
          })}
          dangerouslySetInnerHTML={{ __html: textHTML || description }}
        ></p>
        <p className="absolute right-6 top-[-2rem]">
          <time dateTime={formattedDate}>{formattedDate},</time>
          <time dateTime={time}> {time}</time>
        </p>
      </Container>
    </li>
  );
};

export default MessageItemDetails;
