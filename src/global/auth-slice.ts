import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

type AuthType = {
  email: string;
  username: string;
  avatar: string;
};

export type AuthState = {
  auth: AuthType;
  persist: string | undefined;
};

const initialState: AuthState = {
  auth: { email: "", username: "", avatar: "" },
  persist: Cookies.get("refreshToken"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuth(state, action: PayloadAction<{ authData: AuthType }>) {
      state.auth = action.payload.authData;
    },
    setPersist(state, action: PayloadAction<{ token: string }>) {
      state.persist = action.payload.token;
    },
  },
});

export const { setAuth, setPersist } = authSlice.actions;
