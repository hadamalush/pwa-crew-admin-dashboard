import { initialStateType, messageDetailsType, messageProps } from "./message-slice";
import { createSelector } from "reselect";

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

  return uniqueMessages;
};

export const getUniqueMsgById = (state: initialStateType, owner: string, subject: string) => {
  const receivedMessages = state.allMessages

    .filter((msg) => {
      return (msg.subject === subject || "Re: " + msg.subject === subject) && msg.owner === owner;
    })
    .map((msg) => msg.id);

  const sentMessages = state.allMessages
    .filter((msg) => {
      return msg.subject === subject && msg.to === owner;
    })
    .map((msg) => msg.id);

  const allMsgs = [...receivedMessages, ...sentMessages];

  return allMsgs;
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
      filteredMessages = allMessages.filter((message) => !message.isInSpam && !message.isInTrash);
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
