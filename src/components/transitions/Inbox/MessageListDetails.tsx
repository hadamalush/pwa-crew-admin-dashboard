import { useGlobalSelector } from "../../../global/hooks";
import { cn } from "../../../util/utils";
import { basicVariant } from "../../variants/variants";
import { useParams } from "react-router";
import ToolbarInboxDetails from "../ToolbarInboxDetails";
import MessageItemDetails from "./MessageItemDetails";
import { DUMMY_SENTMESSAGES } from "../dummy-items";
// import TextEditor from "../Editor/TextEditor";

const MessageListDetails = () => {
  const { messageId } = useParams();

  const allMessages = useGlobalSelector((state) => state.messages.allMessages);
  const messageItem = allMessages.find((val) => val.id === messageId);
  const groupReceivedMessages = allMessages.filter(
    (message) => message.subject === messageItem?.subject && message.owner === messageItem.owner
  );
  const groupSentMessages = DUMMY_SENTMESSAGES.filter(
    (message) => message.subject === messageItem?.subject && message.to === messageItem.email
  );

  const sortedMessages = [...groupReceivedMessages, ...groupSentMessages].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });

  if (!messageItem) {
    return null;
  }

  console.log(sortedMessages);

  return (
    <ul
      className={cn(
        basicVariant({ box: "default" }),
        "w-full h-screen rounded-none md:rounded-xl overflow-hidden sm:mt-0 duration-200 overflow-y-auto"
      )}
    >
      <ToolbarInboxDetails message={messageItem} />
      <li className="p-10 pb-5 ml-16 md:ml-20 text-black dark:text-white">
        <h1>{messageItem.subject}</h1>
      </li>

      <MessageItemDetails
        avatarSrc={messageItem.avatarSrc}
        date={messageItem.date}
        description={messageItem.description}
        email={messageItem.email}
        owner={messageItem.owner}
      />
    </ul>
  );
};

export default MessageListDetails;
