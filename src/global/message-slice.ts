import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import { DUMMY_INBOXMESSAGES } from "../components/transitions/dummy-items";

export interface messageProps {
  id: string;
  owner: string;
  subject: string;
  avatarSrc?: string;
  isFeatured: boolean;
  unRead: boolean;
  date: string;
}

export interface messageDetailsType extends messageProps {
  email: string;
  description: string;
  isInSpam: boolean;
  isInTrash: boolean;
}

type CurrentPagePagType = {
  currentPage: number;
  messPerPage: number;
};

export type initialStateType = {
  allMessages: messageDetailsType[];
  currentPagePag: CurrentPagePagType;
  trashMessages: messageProps[];
  featuredMessages: messageProps[];
  spamMessages: messageProps[];
  inboxMessages: messageProps[];
  checkedMessages: string[];
  areMarkedAllMessages: boolean;
  isMarkedCheckboxAll: boolean;
};

const initialCurrentPage = {
  currentPage: 1,
  messPerPage: 10,
};

const initialState: initialStateType = {
  allMessages: [],
  currentPagePag: initialCurrentPage,
  trashMessages: [],
  featuredMessages: [],
  spamMessages: [],
  inboxMessages: [],
  checkedMessages: [],
  areMarkedAllMessages: false,
  isMarkedCheckboxAll: false,
};

export const messageSlice = createSlice({
  name: "message",
  initialState: initialState,
  reducers: {
    setAllMessages(state, action: PayloadAction<{ allMessages: messageDetailsType[] }>) {
      state.allMessages = action.payload.allMessages;
    },
    addNewMsgPackage(state, action: PayloadAction<{ messages: messageDetailsType[] }>) {
      const foundMess = state.allMessages.find(
        (message) => message.id === action.payload.messages[0].id
      );

      if (foundMess) {
        return;
      }

      state.allMessages = [...state.allMessages, ...action.payload.messages];
    },
    filterMessages(
      state,
      action: PayloadAction<{ pageName: "trash" | "spam" | "inbox" | "featured" }>
    ) {
      const pageName = action.payload.pageName;
      let filteredMessages: messageDetailsType[] = [];

      if (action.payload.pageName === "inbox") {
        filteredMessages = state.allMessages.filter(
          (message) => !message.isInSpam && !message.isInTrash
        );
      }
      if (action.payload.pageName === "spam") {
        filteredMessages = state.allMessages.filter((message) => message.isInSpam);
      }
      if (action.payload.pageName === "trash") {
        filteredMessages = state.allMessages.filter((message) => message.isInTrash);
      }
      if (action.payload.pageName === "featured") {
        filteredMessages = state.allMessages.filter((message) => message.isFeatured);
      }

      const destructionMessages = filteredMessages.map(
        ({ id, owner, subject, avatarSrc, isFeatured, unRead, date }) => ({
          id,
          owner,
          subject,
          avatarSrc,
          isFeatured,
          unRead,
          date: new Date(date).toISOString(),
        })
      );

      state[`${pageName}Messages`] = destructionMessages;
    },

    markSingleMessage(
      state,
      action: PayloadAction<{
        id: string;
        action: "add" | "remove" | "featured";
        pageName: "spam" | "trash" | "inbox" | "featured";
      }>
    ) {
      const messageId = action.payload.id;
      const pageName = action.payload.pageName;

      if (action.payload.action === "add") {
        state.checkedMessages.push(messageId);

        if (state[`${pageName}Messages`].length === state.checkedMessages.length) {
          state.areMarkedAllMessages = true;
          state.isMarkedCheckboxAll = true;
        }
        return;
      }
      if (action.payload.action === "remove") {
        state.checkedMessages = state.checkedMessages.filter((message) => message !== messageId);

        if (state.areMarkedAllMessages) {
          state.isMarkedCheckboxAll = false;
        }

        if (state.checkedMessages.length === 0) {
          state.areMarkedAllMessages = false;
          state.isMarkedCheckboxAll = false;
        }
      }
      if (action.payload.action === "featured") {
        const newMessages = state.allMessages.map((message) => {
          if (message.id === messageId) {
            return { ...message, isFeatured: !message.isFeatured };
          }
          return message;
        });

        state.allMessages = newMessages;
      }
    },

    setCheckedMessages(state, action: PayloadAction<{ checkedMessages: string[] }>) {
      state.checkedMessages = action.payload.checkedMessages;
    },

    markAllMessage(state, action: PayloadAction<{ allMessagesMarked: boolean }>) {
      state.areMarkedAllMessages = action.payload.allMessagesMarked;
      state.isMarkedCheckboxAll = action.payload.allMessagesMarked;
    },

    changeCheckboxAll(state, action: PayloadAction<{ checkbox: boolean }>) {
      state.isMarkedCheckboxAll = action.payload.checkbox;
    },

    moveMessages(
      state,
      action: PayloadAction<{ moveTo: "trash" | "inbox" | "spam"; id?: string }>
    ) {
      const moveTo = action.payload.moveTo;
      const id = action.payload.id;
      const isTrash = moveTo === "trash";
      const isSpam = moveTo === "spam";

      if (id) {
        const foundMessage = state.allMessages.map((message) => {
          if (message.id === id) {
            return { ...message, isInSpam: isSpam, isInTrash: isTrash };
          }

          return message;
        });

        if (foundMessage) state.allMessages = foundMessage;

        return;
      }

      const newMessages = state.allMessages.map((item) => {
        if (state.checkedMessages.includes(item.id)) {
          return { ...item, isInTrash: isTrash, isInSpam: isSpam };
        }
        return item;
      });

      state.allMessages = newMessages;
      state.checkedMessages = [];
    },
    changeCurrentPage(state, action: PayloadAction<{ page: "previous" | "next" }>) {
      const page = action.payload.page;
      if (page === "previous" && state.currentPagePag.currentPage === 1) return;
      if (page === "next") {
        state.currentPagePag.currentPage++;
      }
      if (page === "previous") {
        state.currentPagePag.currentPage--;
      }
    },
    resetCurrentPage(state) {
      state.currentPagePag = initialCurrentPage;
    },
  },
});

export const getInboxPage = (path: string) => {
  const allowedPages = ["trash", "spam", "featured", "inbox"];
  const pageName = path.slice(path.lastIndexOf("/") + 1) as "trash" | "spam" | "featured" | "inbox";

  const receivedPage = allowedPages.includes(pageName) ? pageName : null;

  return receivedPage;
};

export const getNumberOfMessagesByPage = (
  state: initialStateType,
  page: "inbox" | "spam" | "featured" | "trash" | null
) => {
  let numberMessages;

  if (page === "spam") {
    numberMessages = state.allMessages.filter((item) => item.isInSpam === true).length;
  } else if (page === "trash") {
    numberMessages = state.allMessages.filter((item) => item.isInTrash === true).length;
  } else if (page === "inbox") {
    numberMessages = state.allMessages.filter(
      (item) => item.isInTrash === false && item.isInSpam === false
    ).length;
  } else if (page === "featured") {
    numberMessages = state.allMessages.filter((item) => item.isFeatured === true).length;
  }

  return numberMessages;
};

export const {
  setAllMessages,
  filterMessages,
  markSingleMessage,
  setCheckedMessages,
  markAllMessage,
  moveMessages,
  changeCheckboxAll,
  changeCurrentPage,
  resetCurrentPage,
  addNewMsgPackage,
} = messageSlice.actions;
