import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ToggleState = {
  isVisibleNav: boolean;
  isVisibleInboxNav: boolean;
  isLoading: boolean;
  theme: "dark" | "light";
  stats: number;
};

const initialState: ToggleState = {
  isVisibleNav: false,
  isVisibleInboxNav: false,
  isLoading: false,
  theme: "dark",
  stats: 0,
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
    setLoading(state, action: PayloadAction<{ loading: boolean }>) {
      state.isLoading = action.payload.loading;
    },
    setStats(state, action: PayloadAction<{ stat: number }>) {
      state.stats = action.payload.stat;
    },
  },
});

export const { handleNav, handleInboxNav, handleTheme, setLoading, setStats } = toggleSlice.actions;
