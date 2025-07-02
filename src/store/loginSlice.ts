import { LoginState } from "@/data/types/interfaces";
import { createSlice } from "@reduxjs/toolkit";
const initialState: LoginState = {
  isLoggedIn: false,
  credentialsFalse: null,
  credentials: {
    username: "demo",
    password: "demo",
  },
};
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      const { username, password } = action.payload;
      if (
        username === state.credentials.username &&
        password === state.credentials.password
      ) {
        state.isLoggedIn = true;
        state.credentialsFalse = state.credentialsFalse ? false : null;
      } else {
        state.isLoggedIn = false;
        state.credentialsFalse = true;
      }
    },
    setSavedLogin: (state, action) => {
      if (action.payload) {
        state.isLoggedIn = true;
      }
    },
    setLogout: (state) => {
      state.isLoggedIn = false;
      state.credentialsFalse = null;
    },
  },
});
export const { setLogin, setSavedLogin, setLogout } = loginSlice.actions;
