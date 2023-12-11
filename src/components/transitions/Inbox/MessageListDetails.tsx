import { useGlobalDispatch, useGlobalSelector } from "../../../global/hooks";
import { cn } from "../../../util/utils";
import { basicVariant } from "../../variants/variants";
import { useParams } from "react-router";
import ToolbarInboxDetails from "./ToolbarInboxDetails";
import MessageItemDetails from "./MessageItemDetails";
import NewMessage from "./NewMessage";
import Avatar from "../Avatar";
import { getGropedMessages } from "../../../global/message-action";
import { useEffect } from "react";
import { type messageDetailsType, setMsgsAsRead as setAsRead } from "../../../global/message-slice";
import { AxiosInstance } from "axios";
import { AppDispatch } from "../../../global/store";
import useAxiosPrivate from "../../../hooks/usePrivateAxios";

const MessageListDetails = () => {
  const { messageId } = useParams();

  const allMessages = useGlobalSelector((state) => state.messages.allMessages);
  const messageItem = allMessages.find((val) => val.id === messageId);
  const groupReceivedMessages = getGropedMessages(allMessages, messageItem);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useGlobalDispatch();

  const sortedMessages = groupReceivedMessages.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });

  useEffect(() => {
    setMsgsAsRead(axiosPrivate, dispatch, groupReceivedMessages);
  }, [axiosPrivate, dispatch, groupReceivedMessages]);

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

const getUnreadMessages = (msg: messageDetailsType[]) => {
  const foundUnreadMsgIds = msg.filter((msg) => msg.unRead).map((msg) => msg.id);

  return foundUnreadMsgIds;
};

const setMsgsAsRead = async (
  axiosPrivate: AxiosInstance,
  dispatch: AppDispatch,
  msgs: messageDetailsType[]
) => {
  let response;

  const msgIds = getUnreadMessages(msgs);

  if (msgIds.length < 1) return;

  try {
    response = await axiosPrivate.post("/admin/inbox/markAsRead", msgIds);

    if (response.status === 200) {
      dispatch(setAsRead({ msgIds: msgIds }));

      return;
    }
  } catch (err) {
    console.log(err);
    return;
  }
};
