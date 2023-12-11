import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export type UserProps = {
  id: string;
  username: string;
  email: string;
  avatarImg?: string;
  isActivated: boolean;
  newsletter: boolean;
  createAt: string;
};

export type UserState = {
  allUsers: UserProps[];
};

const initialState: UserState = {
  allUsers: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    setUsers(state, action: PayloadAction<{ users: UserProps[] }>) {
      const users = action.payload.users;
      state.allUsers = users;
    },
  },
});

export const { setUsers } = usersSlice.actions;
