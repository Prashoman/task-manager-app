import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store";
import { TUser } from "../../../utils/type/user.type";

export type TInitialState = {
  user: null | TUser;
  token: null | string;
};

const initialState: TInitialState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: TUser | null; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setCurrentUser: (state, action: PayloadAction<{ user: TUser }>) => {
      state.user = action.payload.user;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logOut, setCurrentUser } = authSlice.actions;
export default authSlice.reducer;

export const currentUser = (state: RootState) => state.auth.user;
export const currentToken = (state: RootState) => state.auth.token;
