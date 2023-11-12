import { configureStore } from "@reduxjs/toolkit";
import { toggleSlice } from "./toggle-slice";

export const store = configureStore({
  reducer: { toggle: toggleSlice.reducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
