import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { DUMMY_USERSFULL } from "../components/transitions/dummy-items";

export type UserProps = {
  name: string;
  email: string;
  avatarSrc?: string;
  accountActive: boolean;
  newsletter: boolean;
  createdAccount: string;
};

export type UserState = {
  allUsers: UserProps[];
};

const initialState: UserState = {
  allUsers: DUMMY_USERSFULL,
};

export const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    // handleNav(state, action: PayloadAction<{ isVisibleNav: boolean }>) {
    //   state.isVisibleNav = action.payload.isVisibleNav;
    // },
    // handleInboxNav(state, action: PayloadAction<{ isVisibleInboxNav: boolean }>) {
    //   state.isVisibleInboxNav = action.payload.isVisibleInboxNav;
    // },
    // handleTheme(state, action: PayloadAction<{ theme: "dark" | "light" }>) {
    //   state.theme = action.payload.theme;
    // },
  },
});

export const {} = usersSlice.actions;
