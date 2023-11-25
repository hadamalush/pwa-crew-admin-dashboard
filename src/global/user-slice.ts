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
  },
});

export const { display } = usersSlice.actions;
