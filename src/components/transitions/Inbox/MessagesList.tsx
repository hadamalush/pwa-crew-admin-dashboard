import { cn } from "../../../util/utils";
import { basicVariant } from "../../variants/variants";
import MessageItem from "./MessageItem";
import { useGlobalSelector } from "../../../global/hooks";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useRef, type RefObject, createRef } from "react";
import {
  setCheckedMessages,
  markAllMessage,
  setUncheckedMessages,
} from "../../../global/message-slice";
import usePage from "../../../hooks/usePage";
import Icon from "../../UI/Icons/Icon";
import Heading from "../../UI/Heading";
import { AnimatePresence, motion } from "framer-motion";
import {
  getCurrentMess,
  getFilteredMessages,
  getUniqueMessages,
} from "../../../global/message-action";
import LoaderTitle from "../../UI/Loader/TitleLoader";

type MessagesListProps = {
  pageName: "spam" | "trash" | "inbox" | "featured";
};

const MessagesList = ({ pageName }: MessagesListProps) => {
  const dispatch = useDispatch();
  const messState = useGlobalSelector((state) => state.messages);
  const selectedMess = messState.checkedMessages;
  const isSelectedAllMess = messState.areMarkedAllMessages;
  const inputRefs = useRef<Array<RefObject<HTMLInputElement>>>([]);
  const checkedMessages = getFilteredMessages(messState, pageName);
  const uniqueMessages = getUniqueMessages(checkedMessages);
  const currentMess = getCurrentMess(messState, uniqueMessages);

  const isLoading = useGlobalSelector((state) => state.toggle.isTopLoading);

  const { changedPathMess } = usePage("inbox");

  const handleMessagesCheckbox = useCallback(() => {
    const checkedMessages: string[] = [];
    if (!changedPathMess) {
      dispatch(markAllMessage({ allMessagesMarked: false }));
      dispatch(setUncheckedMessages());

      return;
    }
    if (changedPathMess) {
      dispatch(markAllMessage({ allMessagesMarked: false }));
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
        dispatch(markAllMessage({ allMessagesMarked: true }));
      }

      return;
    }
    inputRefs.current.forEach((ref) => {
      if (ref.current !== null) {
        ref.current.checked = false;
      }
    });
    dispatch(setCheckedMessages({ checkedMessages: [] }));
    dispatch(markAllMessage({ allMessagesMarked: false }));
  }, [isSelectedAllMess, dispatch, inputRefs, changedPathMess]);

  useEffect(() => handleMessagesCheckbox, [isSelectedAllMess, handleMessagesCheckbox]);

  return (
    <ul
      className={cn(
        basicVariant({ box: "default" }),
        "w-full h-auto  rounded-none md:rounded-xl overflow-hidden sm:mt-0 duration-200",
        {
          "mt-16": selectedMess.length > 0,
          "min-h-screen": currentMess.length < 10,
        },
        {}
      )}
    >
      <AnimatePresence>
        {checkedMessages.length === 0 && !isLoading && (
          <motion.div
            initial={{ y: -500, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0 }}
            className="mt-28"
          >
            <Icon
              iconName="spiderWeb"
              className={cn(" w-1/2 h-1/2 z-[-1]  duration-300 mx-auto sm:w-1/4 sm:h-1/4 sm:mt-40")}
            />

            <Heading
              as="h2"
              className="text-center  text-3xl sm:mt-14 font-semibold pt-14 text-black dark:text-white"
            >
              YOU HAVE NO MESSAGES
            </Heading>
            <p className="text-center p-5 text-black dark:text-white">Your inbox is empty.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading && checkedMessages.length === 0 && (
        <LoaderTitle className="mx-auto block text-center mt-72" />
      )}

      {currentMess.map((message, index) => {
        inputRefs.current[index] = createRef<HTMLInputElement>();

        return (
          <MessageItem
            key={message.id}
            dataMessage={message}
            ref={inputRefs.current[index]}
            pageName={pageName}
          />
        );
      })}
    </ul>
  );
};

export default MessagesList;
