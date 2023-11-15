import { cn } from "../../../util/utils";
import { basicVariant } from "../../variants/variants";
// import { DUMMY_INBOXMESSAGES } from "../dummy-items";
import MessageItem from "./MessageItem";
import { useGlobalSelector } from "../../../global/hooks";
import { useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import { filterMessages } from "../../../global/message-slice";

const MessagesList = () => {
  const dispatch = useDispatch();
  const messages = useGlobalSelector((state) => state.messages.inboxMessages);

  const dipatchFilterMessages = useCallback(() => {
    dispatch(filterMessages({ pageName: "inbox" }));
  }, [dispatch]);

  useEffect(() => {
    dipatchFilterMessages();
  }, [dipatchFilterMessages]);

  return (
    <ul
      className={cn(
        basicVariant({ box: "default" }),
        "w-full h-screen rounded-none md:rounded-xl overflow-hidden"
      )}
    >
      {messages.map((message) => (
        <MessageItem key={message.id} dataMessage={message} />
      ))}
    </ul>
  );
};

export default MessagesList;
