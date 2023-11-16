import { cn } from "../../../util/utils";
import { basicVariant } from "../../variants/variants";
import MessageItem from "./MessageItem";
import { useGlobalSelector } from "../../../global/hooks";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useRef, type RefObject, createRef, useState } from "react";
import { filterMessages, setCheckedMessages } from "../../../global/message-slice";

type MessagesListProps = { pageName: "spam" | "trash" | "inbox" };

const MessagesList = ({ pageName }: MessagesListProps) => {
  const dispatch = useDispatch();
  const [isAllSelected, setIsAllSelected] = useState(false);
  const inputRefs = useRef<Array<RefObject<HTMLInputElement>>>([]);
  const messages = useGlobalSelector((state) => state.messages[`${pageName}${"Messages"}`]);
  const checkedMessages: string[] = [];

  const dipatchFilterMessages = useCallback(() => {
    dispatch(filterMessages({ pageName: pageName }));
  }, [dispatch, pageName]);

  useEffect(() => {
    dipatchFilterMessages();
  }, [dipatchFilterMessages]);

  const changeAllCheckedMessages = () => {
    if (!isAllSelected) {
      inputRefs.current.forEach((ref) => {
        if (ref.current !== null) {
          ref.current.checked = true;

          checkedMessages.push(ref.current.id);
        }
      });

      dispatch(setCheckedMessages({ checkedMessages }));
      setIsAllSelected(true);
      return;
    }

    inputRefs.current.forEach((ref) => {
      if (ref.current !== null) {
        ref.current.checked = false;
      }
    });

    dispatch(setCheckedMessages({ checkedMessages: [] }));
    setIsAllSelected(false);
  };

  return (
    <ul
      className={cn(
        basicVariant({ box: "default" }),
        "w-full h-screen rounded-none md:rounded-xl overflow-hidden"
      )}
    >
      <button onClick={changeAllCheckedMessages}>dasdasd</button>
      {messages.map((message, index) => {
        inputRefs.current[index] = createRef<HTMLInputElement>();

        return (
          <MessageItem key={message.id} dataMessage={message} ref={inputRefs.current[index]} />
        );
      })}
    </ul>
  );
};

export default MessagesList;
