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
  spamMessages: messageProps[];
  inboxMessages: messageProps[];
  checkedMessages: string[];
  isSelectedMessages: boolean;
};

const initialState: initialStateType = {
  allMessages: DUMMY_INBOXMESSAGES,
  trashMessages: [],
  spamMessages: [],
  inboxMessages: [],
  checkedMessages: [],
  isSelectedMessages: false,
};

export const messageSlice = createSlice({
  name: "message",
  initialState: initialState,
  reducers: {
    filterMessages(state, action: PayloadAction<{ pageName: "trash" | "spam" | "inbox" }>) {
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

    actionCheckedMessage(state, action: PayloadAction<{ id: string; action: "add" | "remove" }>) {
      if (action.payload.action === "add") {
        state.checkedMessages.push(action.payload.id);
        return;
      }
      if (action.payload.action === "remove") {
        state.checkedMessages = state.checkedMessages.filter(
          (message) => message !== action.payload.id
        );
      }
    },

    setCheckedMessages(state, action: PayloadAction<{ checkedMessages: string[] }>) {
      state.checkedMessages = action.payload.checkedMessages;
    },

    setIsSelectedMessages(state, action: PayloadAction<{ selectedMessages: boolean }>) {
      state.isSelectedMessages = action.payload.selectedMessages;
    },

    moveMessages(state, action: PayloadAction<{ moveTo: "trash" | "inbox" | "spam" }>) {
      const moveTo = action.payload.moveTo;
      const isTrash = moveTo === "trash";
      const isSpam = moveTo === "spam";

      const newArray = state.allMessages.map((item) => {
        if (state.checkedMessages.includes(item.id)) {
          return { ...item, isInTrash: isTrash, isInSpam: isSpam };
        }
        return item;
      });

      state.allMessages = newArray;
      state.checkedMessages = [];
    },
  },
});

export const {
  filterMessages,
  actionCheckedMessage,
  setCheckedMessages,
  setIsSelectedMessages,
  moveMessages,
} = messageSlice.actions;
