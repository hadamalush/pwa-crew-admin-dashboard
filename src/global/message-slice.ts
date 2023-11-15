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
};

const initialState: initialStateType = {
  allMessages: DUMMY_INBOXMESSAGES,
  trashMessages: [],
  spamMessages: [],
  inboxMessages: [],
};

export const messageSlice = createSlice({
  name: "toggle",
  initialState: initialState,
  reducers: {
    filterMessages(state, action: PayloadAction<{ pageName: "trash" | "spam" | "inbox" }>) {
      if (action.payload.pageName === "inbox") {
        const inboxMessages = state.allMessages
          .filter((message) => !message.isInSpam && !message.isInTrash)
          .map(({ id, owner, subject, avatarSrc, isFeatured, isRead, date }) => ({
            id,
            owner,
            subject,
            avatarSrc,
            isFeatured,
            isRead,
            date: new Date(date).toISOString(),
          }));

        state.inboxMessages = inboxMessages;
        console.log("inbox");
      }
      if (action.payload.pageName === "spam") {
        console.log("spam");
        const spamMessages = state.allMessages
          .filter((message) => message.isInSpam)
          .map(({ id, owner, subject, avatarSrc, isFeatured, isRead, date }) => ({
            id,
            owner,
            subject,
            avatarSrc,
            isFeatured,
            isRead,
            date: new Date(date).toISOString(),
          }));

        state.spamMessages = spamMessages;
      }
      if (action.payload.pageName === "trash") {
        console.log("trash");
        const trashMessages = state.allMessages
          .filter((message) => message.isInTrash)
          .map(({ id, owner, subject, avatarSrc, isFeatured, isRead, date }) => ({
            id,
            owner,
            subject,
            avatarSrc,
            isFeatured,
            isRead,
            date: new Date(date).toISOString(),
          }));

        state.trashMessages = trashMessages;
      }
    },
  },
});

export const { filterMessages } = messageSlice.actions;
