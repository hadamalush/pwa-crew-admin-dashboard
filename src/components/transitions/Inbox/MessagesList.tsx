import { cn } from "../../../util/utils";
import { basicVariant } from "../../variants/variants";
import { DUMMY_INBOXMESSAGES } from "../dummy-items";
import MessageItem from "./MessageItem";

const MessagesList = () => {
  return (
    <ul
      className={cn(basicVariant({ box: "default" }), "w-full h-screen rounded-none md:rounded-xl")}
    >
      {DUMMY_INBOXMESSAGES.map((message) => (
        <MessageItem key={message.id} dataMessage={message} />
      ))}
    </ul>
  );
};

export default MessagesList;
