import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ToggleState = {
  isVisibleNav: boolean;
  isVisibleInboxNav: boolean;
  isLoading: boolean;
  isTopLoading: boolean;
  textTopLoader: string;
  pathTopLoader: string;
  theme: "dark" | "light";
};

const initialState: ToggleState = {
  isVisibleNav: false,
  isVisibleInboxNav: false,
  isLoading: false,
  isTopLoading: false,
  textTopLoader: "",
  pathTopLoader: "",
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
    setLoading(state, action: PayloadAction<{ loading: boolean }>) {
      state.isLoading = action.payload.loading;
    },
    setTopLoading(
      state,
      action: PayloadAction<{ loading: boolean; text?: string; path?: string }>
    ) {
      const text = action.payload.text;
      const path = action.payload.path;
      state.isTopLoading = action.payload.loading;

      if (text) {
        state.textTopLoader = text;
      }

      if (path) {
        state.pathTopLoader = path;
      }
    },
  },
});

export const { handleNav, handleInboxNav, handleTheme, setLoading, setTopLoading } =
  toggleSlice.actions;
