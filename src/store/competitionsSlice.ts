import { competitions } from "@/data/competitions";
import { Competition } from "@/data/types/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const competitionsSlice = createSlice({
  name: "competitions",
  initialState: competitions,
  reducers: {
    addCompetition: (state, action: PayloadAction<Competition>) => {
      state.push(action.payload as Competition);
    },
    setCompetitions: (_state, action: PayloadAction<Competition[]>) => {
      return action.payload;
    },
    appendCompetition: (state, action: PayloadAction<Competition>) => {
      return state.map((single) =>
        single.id === action.payload.id ? action.payload : single
      );
    },
    deleteCompetition: (state, action: PayloadAction<string>) => {
      return state.filter((single) => single.id !== action.payload);
    },
  },
});
export const {
  addCompetition,
  setCompetitions,
  appendCompetition,
  deleteCompetition,
} = competitionsSlice.actions;