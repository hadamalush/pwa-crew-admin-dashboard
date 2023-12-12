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
    deleteUser(state, action: PayloadAction<{ userId: string }>) {
      const { userId } = action.payload;

      state.allUsers = state.allUsers.filter((user) => user.id !== userId);
    },
    addUser(state, action: PayloadAction<{ user: UserProps }>) {
      const { user } = action.payload;

      state.allUsers.push(user);
    },
    editUser(
      state,
      action: PayloadAction<{ userId: string; newUsername: string; newEmail: string }>
    ) {
      const { userId, newUsername, newEmail } = action.payload;

      const user = state.allUsers.find((user) => user.id === userId);

      if (user) {
        user.email = newEmail;
        user.username = newUsername;
      }
    },
  },
});

export const { setUsers, editUser, deleteUser, addUser } = usersSlice.actions;
