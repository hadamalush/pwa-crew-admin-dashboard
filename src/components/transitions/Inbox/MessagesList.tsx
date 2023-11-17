import { cn } from "../../../util/utils";
import { basicVariant } from "../../variants/variants";
import MessageItem from "./MessageItem";
import { useGlobalSelector } from "../../../global/hooks";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useRef, type RefObject, createRef } from "react";
import {
  filterMessages,
  setCheckedMessages,
  setIsSelectedMessages,
} from "../../../global/message-slice";
import { usePage } from "../../../hooks/usePage";

type MessagesListProps = { pageName: "spam" | "trash" | "inbox" | "featured" };

const MessagesList = ({ pageName }: MessagesListProps) => {
  const dispatch = useDispatch();
  const isSelectedAllMess = useGlobalSelector((state) => state.messages.isSelectedMessages);
  const inputRefs = useRef<Array<RefObject<HTMLInputElement>>>([]);
  const messages = useGlobalSelector((state) => state.messages[`${pageName}${"Messages"}`]);
  const checkedMessages = useGlobalSelector((state) => state.messages.checkedMessages);

  const { changedPath } = usePage();

  const dispatchFilterMessages = useCallback(() => {
    dispatch(filterMessages({ pageName: pageName }));
  }, [dispatch, pageName]);

  useEffect(() => {
    dispatchFilterMessages();
  }, [dispatchFilterMessages, checkedMessages]);

  const handleMessagesCheckbox = useCallback(() => {
    const checkedMessages: string[] = [];
    if (!changedPath) {
      return;
    }
    if (changedPath) {
      dispatch(setIsSelectedMessages({ selectedMessages: false }));
    }

    if (!isSelectedAllMess) {
      inputRefs.current.forEach((ref) => {
        if (ref.current !== null) {
          ref.current.checked = true;
          checkedMessages.push(ref.current.id);
        }
      });

      if (checkedMessages.length > 0) {
        dispatch(setCheckedMessages({ checkedMessages }));
        dispatch(setIsSelectedMessages({ selectedMessages: true }));
      }

      return;
    }
    inputRefs.current.forEach((ref) => {
      if (ref.current !== null) {
        ref.current.checked = false;
      }
    });
    dispatch(setCheckedMessages({ checkedMessages: [] }));
    dispatch(setIsSelectedMessages({ selectedMessages: false }));
  }, [isSelectedAllMess, dispatch, inputRefs, changedPath]);

  useEffect(() => handleMessagesCheckbox, [isSelectedAllMess, handleMessagesCheckbox]);

  return (
    <ul
      className={cn(
        basicVariant({ box: "default" }),
        "w-full h-screen rounded-none md:rounded-xl overflow-hidden sm:mt-0 duration-200",
        { "mt-16": checkedMessages.length > 0 }
      )}
    >
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
