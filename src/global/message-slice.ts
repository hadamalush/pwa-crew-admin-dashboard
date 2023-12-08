import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getUniqueMessages } from "./message-action";

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
  isInSent: boolean;
  textHTML: string;
  to?: string;
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
  sentMessages: messageProps[];
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
  sentMessages: [],
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
    addNewMsgSingle(state, action: PayloadAction<{ message: messageDetailsType }>) {
      const message = action.payload.message;
      state.allMessages.push(message);
    },

    deleteMessages(state) {
      state.allMessages = state.allMessages.filter(
        (message) => !state.checkedMessages.includes(message.id)
      );

      state.checkedMessages = [];
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
        pageName: "spam" | "trash" | "inbox" | "featured" | "sent";
      }>
    ) {
      const messageId = action.payload.id;
      const pageName = action.payload.pageName;

      const foundMessage = state.allMessages.find((msg) => msg.id === messageId);

      const groupMessages = state.allMessages.filter((msg) => {
        const fSubject = msg.subject.replace(/^Re:\s*/, "");

        return (
          (msg.subject === foundMessage?.subject ||
            "Re: " + msg.subject === foundMessage?.subject ||
            fSubject === foundMessage?.subject) &&
          (msg.owner === foundMessage?.owner || msg.to === foundMessage?.owner)
        );
      });

      const messagesIds = groupMessages.map((msg) => msg.id);

      if (action.payload.action === "add") {
        state.checkedMessages = state.checkedMessages.concat(messagesIds);

        if (state[`${pageName}Messages`].length === state.checkedMessages.length) {
          state.areMarkedAllMessages = true;
          state.isMarkedCheckboxAll = true;
        }
        return;
      }
      if (action.payload.action === "remove") {
        state.checkedMessages = state.checkedMessages.filter(
          (message) => !messagesIds.includes(message)
        );

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
      const checkedMessages = action.payload.checkedMessages;

      const foundMessages = state.allMessages.filter((message) =>
        checkedMessages.includes(message.id)
      );
      const groupedMessages = state.allMessages
        .filter((message) =>
          foundMessages.some(
            (foundMessage) =>
              (foundMessage.subject === message.subject ||
                foundMessage.subject === "Re: " + message.subject) &&
              (foundMessage.owner === message.owner || foundMessage.owner === message.to)
          )
        )
        .map((item) => item.id);

      state.checkedMessages = groupedMessages;
    },

    setUncheckedMessages(state) {
      state.checkedMessages = [];
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
  const allowedPages = ["trash", "spam", "featured", "inbox", "sent"];
  const pageName = path.slice(path.lastIndexOf("/") + 1) as
    | "trash"
    | "spam"
    | "featured"
    | "inbox"
    | "sent";

  const receivedPage = allowedPages.includes(pageName) ? pageName : null;

  return receivedPage;
};

export const getNumberOfMessagesByPage = (
  state: initialStateType,
  page: "inbox" | "spam" | "featured" | "trash" | "sent" | null
) => {
  let numberMessages;
  const uniqueMessages = getUniqueMessages(state.allMessages);

  if (page === "spam") {
    numberMessages = uniqueMessages.filter((item) => item.isInSpam).length;
  } else if (page === "trash") {
    numberMessages = uniqueMessages.filter((item) => item.isInTrash).length;
  } else if (page === "sent") {
    numberMessages = uniqueMessages.filter((item) => item.isInSent).length;
  } else if (page === "inbox") {
    numberMessages = uniqueMessages.filter(
      (item) => !item.isInTrash && !item.isInSpam && !item.isInSent
    ).length;
  } else if (page === "featured") {
    numberMessages = uniqueMessages.filter((item) => item.isFeatured).length;
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
  deleteMessages,
  setUncheckedMessages,
  addNewMsgSingle,
} = messageSlice.actions;
