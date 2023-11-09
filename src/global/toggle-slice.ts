import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ToggleState = {
  isVisibleNav: boolean;
};

const initialState: ToggleState = {
  isVisibleNav: false,
};

export const toggleSlice = createSlice({
  name: "toggle",
  initialState: initialState,
  reducers: {
    handleNav(state, action: PayloadAction<{ isVisibleNav: boolean }>) {
      state.isVisibleNav = action.payload.isVisibleNav;
    },
  },
});

export const { handleNav } = toggleSlice.actions;
