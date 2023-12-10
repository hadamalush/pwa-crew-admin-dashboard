import { AxiosInstance } from "axios";
import { fetchAllMessages } from "../util/actions/actions";
import { initialStateType, messageDetailsType, messageProps } from "./message-slice";
import { createSelector } from "reselect";
import { AppDispatch } from "./store";
import { setTopLoading } from "./toggle-slice";

export const getMessIndex = (state: initialStateType, index: "last" | "first") => {
  const currentPage = state.currentPagePag.currentPage;
  const messPerPage = state.currentPagePag.messPerPage;

  const lastMessIndex = currentPage * messPerPage;
  const firstMessIndex = lastMessIndex - messPerPage;

  if (index === "first") {
    return firstMessIndex;
  }
  if (index === "last") {
    return lastMessIndex;
  }

  return;
};

export const getUniqueMessages = (messages: messageDetailsType[]) => {
  const uniqueMessages: messageDetailsType[] = [];

  messages.filter((message) => {
    const duplicateMessage = uniqueMessages.find(
      (uniqueMessage) =>
        (uniqueMessage.subject === message.subject ||
          uniqueMessage.subject === "Re: " + message.subject) &&
        uniqueMessage.owner === message.owner
    );

    if (!duplicateMessage) {
      uniqueMessages.push(message);
    }
  });

  const sortedMessages = uniqueMessages
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    })
    .reverse();

  return sortedMessages;
};

export const getUniqueMsgById = (state: initialStateType, owner: string, subject: string) => {
  const receivedMessages = state.allMessages

    .filter((msg) => {
      const fSubject = msg.subject.replace(/^Re:\s*/, "");
      return (
        (msg.subject === subject || "Re: " + msg.subject === subject || fSubject === subject) &&
        msg.owner === owner
      );
    })
    .map((msg) => msg.id);

  const sentMessages = state.allMessages
    .filter((msg) => {
      const fSubject = msg.subject.replace(/^Re:\s*/, "");
      return (
        (msg.subject === subject || "Re: " + msg.subject === subject || fSubject === subject) &&
        msg.to === owner
      );
    })
    .map((msg) => msg.id);

  const allMsgs = [...receivedMessages, ...sentMessages];

  return allMsgs;
};

export const getGropedMessages = (
  allMessages: messageDetailsType[],
  messageItem: messageDetailsType | undefined
) => {
  const msgs = allMessages.filter((message) => {
    const formattedSubject = messageItem?.subject.replace(/^Re:\s*/, "");
    const isSameSubject =
      message.subject === messageItem?.subject ||
      message.subject === formattedSubject ||
      message.subject === "Re: " + messageItem?.subject;

    const isSameOwner = message.owner === messageItem?.owner;
    const isSameRecipient = message.to === messageItem?.owner;

    return isSameSubject && (isSameOwner || isSameRecipient);
  });
  return msgs;
};

export const getCurrentMess = (state: initialStateType, messages: messageProps[]) => {
  const lastMessIndex = getMessIndex(state, "last");
  const firstMessIndex = getMessIndex(state, "first");
  const currentMess = messages.slice(firstMessIndex, lastMessIndex);

  return currentMess;
};

const getAllMessagesState = (state: initialStateType) => state.allMessages;

export const getFilteredMessages = createSelector(
  [getAllMessagesState, (_state: initialStateType, pageName) => pageName],
  (allMessages, pageName) => {
    let filteredMessages: messageDetailsType[] = [];

    if (pageName === "inbox") {
      filteredMessages = allMessages.filter(
        (message) => !message.isInSpam && !message.isInTrash && !message.isInSent
      );
    }
    if (pageName === "spam") {
      filteredMessages = allMessages.filter((message) => message.isInSpam);
    }
    if (pageName === "trash") {
      filteredMessages = allMessages.filter((message) => message.isInTrash);
    }
    if (pageName === "sent") {
      filteredMessages = allMessages.filter((message) => message.isInSent);
    }
    if (pageName === "featured") {
      filteredMessages = allMessages.filter((message) => message.isFeatured);
    }

    const destructionMessages = filteredMessages.map(
      ({
        id,
        owner,
        subject,
        avatarSrc,
        isFeatured,
        unRead,
        date,
        isInSpam,
        description,
        isInTrash,
        isInSent,
        textHTML,
        to,
        email,
      }) => ({
        id,
        owner,
        subject,
        avatarSrc,
        isFeatured,
        isInSpam,
        isInTrash,
        email,
        isInSent,
        textHTML,
        to,
        unRead,
        description,
        date: new Date(date).toISOString(),
      })
    );

    return destructionMessages;
  }
);

export const fetchMessagesInBackground = async (
  dispatch: AppDispatch,
  axiosPrivate: AxiosInstance
) => {
  dispatch(setTopLoading({ loading: true, text: "Loading messages" }));

  let token,
    newLabel: "SPAM" | "TRASH" | "INBOX" | "SENT" = "SPAM",
    isCountinue = true;

  while (isCountinue) {
    const response = await fetchAllMessages(axiosPrivate, dispatch, newLabel, token);

    token = response.newPageToken;
    newLabel = response.newLabel;

    if (newLabel === "SENT" && token === "") {
      isCountinue = false;
      dispatch(setTopLoading({ loading: false }));
    }

    if (token === "" && newLabel === "SPAM") {
      newLabel = "TRASH";
    } else if (token === "" && newLabel === "TRASH") {
      newLabel = "INBOX";
    } else if (token === "" && newLabel === "INBOX") {
      newLabel = "SENT";
    }

    if (!newLabel) {
      isCountinue = false;
      dispatch(setTopLoading({ loading: false }));
    }
  }
};
