import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ToggleState = {
  isVisibleNav: boolean;
  theme: "dark" | "light";
};

const initialState: ToggleState = {
  isVisibleNav: false,
  theme: "dark",
};

export const toggleSlice = createSlice({
  name: "toggle",
  initialState: initialState,
  reducers: {
    handleNav(state, action: PayloadAction<{ isVisibleNav: boolean }>) {
      state.isVisibleNav = action.payload.isVisibleNav;
    },
    handleTheme(state, action: PayloadAction<{ theme: "dark" | "light" }>) {
      state.theme = action.payload.theme;
    },
  },
});

export const { handleNav, handleTheme } = toggleSlice.actions;
