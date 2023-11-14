import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ToggleState = {
  isVisibleNav: boolean;
  isVisibleInboxNav: boolean;
  theme: "dark" | "light";
};

const initialState: ToggleState = {
  isVisibleNav: false,
  isVisibleInboxNav: false,
  theme: "dark",
};

export const toggleSlice = createSlice({
  name: "toggle",
  initialState: initialState,
  reducers: {
    handleNav(state, action: PayloadAction<{ isVisibleNav: boolean }>) {
      state.isVisibleNav = action.payload.isVisibleNav;
    },
    handleInboxNav(state, action: PayloadAction<{ isVisibleInboxNav: boolean }>) {
      state.isVisibleInboxNav = action.payload.isVisibleInboxNav;
    },
    handleTheme(state, action: PayloadAction<{ theme: "dark" | "light" }>) {
      state.theme = action.payload.theme;
    },
  },
});

export const { handleNav, handleInboxNav, handleTheme } = toggleSlice.actions;
