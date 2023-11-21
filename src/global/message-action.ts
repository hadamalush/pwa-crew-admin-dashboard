import { initialStateType, messageProps } from "./message-slice";

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
