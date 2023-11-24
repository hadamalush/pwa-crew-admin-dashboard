import { createSlice } from "@reduxjs/toolkit";
import { DUMMY_USERSFULL } from "../components/transitions/dummy-items";

export type UserProps = {
  id: string;
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
    display(state) {
      console.log(state);
    },
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

export const { display } = usersSlice.actions;
