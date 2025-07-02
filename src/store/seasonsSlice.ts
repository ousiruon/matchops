
import { seasons } from "@/data/seasons";
import { Season } from "@/data/types/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const seasonsSlice = createSlice({
  name: "seasons",
  initialState: seasons,
  reducers: {
    addSeason: (state, action: PayloadAction<Season>) => {
      state.push(action.payload as Season);
    },
    setseasons: (_state, action: PayloadAction<Season[]>) => {
      return action.payload;
    },
    appendSeason: (state, action: PayloadAction<Season>) => {
      return state.map((single) =>
        single.id === action.payload.id ? action.payload : single
      );
    },
    deleteSeason: (state, action: PayloadAction<string>) => {
      return state.filter((single) => single.id !== action.payload);
    },
  },
});
export const {
  addSeason,
  setseasons,
  appendSeason,
  deleteSeason,
} = seasonsSlice.actions;
