import { type ComponentPropsWithoutRef } from "react";
import { cn } from "../../../util/utils";
import Avatar from "../Avatar";
import Container from "../../UI/Container";
import { format } from "date-fns";

type MessageItemDetailsProps = {
  avatarSrc: string;
  date: string;
  description: string;
  textHTML: string;
  to?: string;
  email: string;
  owner: string;
} & ComponentPropsWithoutRef<"li">;

const MessageItemDetails = ({
  avatarSrc,
  date,
  description,
  textHTML,
  to,
  email,
  owner,

  ...props
}: MessageItemDetailsProps) => {
  const convertedDate = new Date(date);
  const formattedDate = format(convertedDate, "yyyy-MM-dd");
  const time = format(convertedDate, "HH:mm");

  return (
    <li
      className={cn(
        `flex  w-full mx-auto text-xl xlg:text-2xl text-black dark:text-textPrimary px-5 border-pLight dark:border-borderPrimary border-b
        py-10 md:px-10 `,
        { "dark:bg-primaryLight bg-slate-200": to },
        props.className
      )}
    >
      <Avatar src={avatarSrc ? avatarSrc : "/avatar.webp"} size="s5" />
      <Container className="flex-col justify-start w-10/12 md:w-11/12 relative">
        <h2 className="text-2xl px-4 font-semibold mr-auto text-black dark:text-textPrimary sm:flex">
          <p>{owner}</p>
          <pre className="font-light"> &lt; {email} &gt;</pre>
        </h2>
        <p
          id="description"
          className={cn("text-2xl px-4 pt-4 mr-auto break-all")}
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
