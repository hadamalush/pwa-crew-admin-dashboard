import { configureStore } from "@reduxjs/toolkit";
import { toggleSlice } from "./toggle-slice";
import { messageSlice } from "./message-slice";
import { usersSlice } from "./user-slice";

export const store = configureStore({
  reducer: {
    toggle: toggleSlice.reducer,
    messages: messageSlice.reducer,
    users: usersSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
