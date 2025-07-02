import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    darkMode: true,
    darkModeUpdated: false,
    playersDisplay: "grid",
    menuPosition: "left",
    rememberPass: true,
  },
  reducers: {
    setMode: (state, action) => {
      state.darkMode = action.payload;
      state.darkModeUpdated = true;
    },
    setPlayerDisplay: (state, action) => {
      state.playersDisplay = action.payload;
    },
    setMenuPosition: (state, action) => {
      state.menuPosition = action.payload;
    },
    setRememberPass: (state, action) => {
      state.rememberPass = action.payload;
    },
  },
});
export const { setMode, setPlayerDisplay, setRememberPass, setMenuPosition } =
  settingsSlice.actions;
