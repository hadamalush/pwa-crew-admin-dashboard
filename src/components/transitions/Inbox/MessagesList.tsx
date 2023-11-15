import { cn } from "../../../util/utils";
import { basicVariant } from "../../variants/variants";
import MessageItem from "./MessageItem";
import { useGlobalSelector } from "../../../global/hooks";
import { useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import { filterMessages } from "../../../global/message-slice";

type MessagesListProps = { pageName: "spam" | "trash" | "inbox" };

const MessagesList = ({ pageName }: MessagesListProps) => {
  const dispatch = useDispatch();
  const messages = useGlobalSelector((state) => state.messages[`${pageName}${"Messages"}`]);

  const dipatchFilterMessages = useCallback(() => {
    dispatch(filterMessages({ pageName: pageName }));
  }, [dispatch, pageName]);

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
