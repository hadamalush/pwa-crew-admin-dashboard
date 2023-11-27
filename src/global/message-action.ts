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
    if (pageName === "featured") {
      filteredMessages = allMessages.filter((message) => message.isFeatured);
    }

    const destructionMessages = filteredMessages.map(
      ({ id, owner, subject, avatarSrc, isFeatured, isRead, date }) => ({
        id,
        owner,
        subject,
        avatarSrc,
        isFeatured,
        isRead,
        date: new Date(date).toISOString(),
      })
    );

    return destructionMessages;
  }
);
