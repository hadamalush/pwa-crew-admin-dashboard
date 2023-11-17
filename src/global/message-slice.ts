import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { DUMMY_INBOXMESSAGES } from "../components/transitions/dummy-items";

export interface messageProps {
  id: string;
  owner: string;
  subject: string;
  avatarSrc: string;
  isFeatured: boolean;
  isRead: boolean;
  date: string;
}

export interface messageDetailsType extends messageProps {
  email: string;
  description: string;
  isInSpam: boolean;
  isInTrash: boolean;
}

type initialStateType = {
  allMessages: messageDetailsType[];
  trashMessages: messageProps[];
  featuredMessages: messageProps[];
  spamMessages: messageProps[];
  inboxMessages: messageProps[];
  checkedMessages: string[];
  areAllMessagesMarked: boolean;
  inputAllIsSelected: boolean;
};

const initialState: initialStateType = {
  allMessages: DUMMY_INBOXMESSAGES,
  trashMessages: [],
  featuredMessages: [],
  spamMessages: [],
  inboxMessages: [],
  checkedMessages: [],
  areAllMessagesMarked: false,
  inputAllIsSelected: false,
};

export const messageSlice = createSlice({
  name: "message",
  initialState: initialState,
  reducers: {
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

      state[`${pageName}Messages`] = destructionMessages;
    },

    actionCheckedMessage(
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
          state.areAllMessagesMarked = true;
          state.inputAllIsSelected = true;
        }
        return;
      }
      if (action.payload.action === "remove") {
        state.checkedMessages = state.checkedMessages.filter((message) => message !== messageId);

        if (state.areAllMessagesMarked) {
          state.inputAllIsSelected = false;
        }

        if (state.checkedMessages.length === 0) {
          state.areAllMessagesMarked = false;
          state.inputAllIsSelected = false;
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

    markAllMessageAsSelect(state, action: PayloadAction<{ allMessagesMarked: boolean }>) {
      state.areAllMessagesMarked = action.payload.allMessagesMarked;
      state.inputAllIsSelected = action.payload.allMessagesMarked;
    },

    changeCheckboxAll(state, action: PayloadAction<{ checkbox: boolean }>) {
      state.inputAllIsSelected = action.payload.checkbox;
    },

    moveMessages(state, action: PayloadAction<{ moveTo: "trash" | "inbox" | "spam" }>) {
      const moveTo = action.payload.moveTo;
      const isTrash = moveTo === "trash";
      const isSpam = moveTo === "spam";

      const newMessages = state.allMessages.map((item) => {
        if (state.checkedMessages.includes(item.id)) {
          return { ...item, isInTrash: isTrash, isInSpam: isSpam };
        }
        return item;
      });

      state.allMessages = newMessages;
      state.checkedMessages = [];
    },
  },
});

export const {
  filterMessages,
  actionCheckedMessage,
  setCheckedMessages,
  markAllMessageAsSelect,
  moveMessages,
  changeCheckboxAll,
} = messageSlice.actions;
