import { useGlobalSelector } from "../../../global/hooks";
import { cn } from "../../../util/utils";
import { basicVariant } from "../../variants/variants";
import { useParams } from "react-router";
import ToolbarInboxDetails from "./ToolbarInboxDetails";
import MessageItemDetails from "./MessageItemDetails";
import NewMessage from "./NewMessage";
import Avatar from "../Avatar";

const MessageListDetails = () => {
  const { messageId } = useParams();

  const allMessages = useGlobalSelector((state) => state.messages.allMessages);
  const messageItem = allMessages.find((val) => val.id === messageId);
  const groupReceivedMessages = allMessages.filter((message) => {
    const formattedSubject = messageItem?.subject.replace(/^Re:\s*/, "");
    const isSameSubject =
      message.subject === messageItem?.subject ||
      message.subject === formattedSubject ||
      message.subject === "Re: " + messageItem?.subject;

    const isSameOwner = message.owner === messageItem?.owner;
    const isSameRecipient = message.to === messageItem?.owner;

    return isSameSubject && (isSameOwner || isSameRecipient);
  });

  const sortedMessages = [...groupReceivedMessages].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });

  if (!messageItem) {
    return null;
  }

  return (
    <ul
      className={cn(
        basicVariant({ box: "default" }),
        "w-full min-h-screen rounded-none md:rounded-xl overflow-hidden sm:mt-0 duration-200 h-auto relative pb-10"
      )}
    >
      <ToolbarInboxDetails message={messageItem} />
      <li className="p-10 pb-5 ml-16 md:ml-20 text-black dark:text-white">
        <h1>{messageItem.subject}</h1>
      </li>

      {sortedMessages.map((message, index) => {
        let messItemClass: string = "";

        if (index === sortedMessages.length - 1) messItemClass = "border-none";

        return (
          <MessageItemDetails
            key={message.id}
            avatarSrc={message.avatarSrc ? message.avatarSrc : ""}
            date={message.date}
            description={message.description}
            email={message.email}
            textHTML={message.textHTML}
            to={message.to ? message.to : ""}
            owner={message.owner}
            className={messItemClass}
          />
        );
      })}

      <li className="flex ml-4 md:ml-10 pt-5">
        <Avatar src="/avatar.webp" size="s5" />
        <NewMessage subject={messageItem.subject} email={messageItem.email} className="w-10/12 " />
      </li>
    </ul>
  );
};

export default MessageListDetails;
