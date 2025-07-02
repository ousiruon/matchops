import { matches } from "@/data/matches";
import { Game } from "@/data/types/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const matchesSlice = createSlice({
  name: "matches",
  initialState: matches,
  reducers: {
    addMatch: (state, action: PayloadAction<Game>) => {
      state.push(action.payload as Game);
    },
    editMatch: (state, action: PayloadAction<Game>) => {
      return state.map((single) =>
        single.id === action.payload.id ? action.payload : single
      );
    },
    deleteMatch: (state, action: PayloadAction<string>) => {
      return state.filter((single) => single.id !== action.payload);
    },
    setMatches: (_state, action: PayloadAction<Game[]>) => {
      return action.payload;
    },
  },
});
export const { addMatch, deleteMatch, editMatch, setMatches } =
  matchesSlice.actions;
