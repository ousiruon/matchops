import { players } from "@/data/players";
import { Player } from "@/data/types/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export const playersSlice = createSlice({
  name: "players",
  initialState: players,
  reducers: {
    addPlayer: (state, action: PayloadAction<Player>) => {
      state.push(action.payload as Player);
    },
    setPlayers: (_state, action: PayloadAction<Player[]>) => {
      return action.payload;
    },
    editPlayer: (state, action: PayloadAction<Player>) => {
      return state.map((player) =>
        player.id === action.payload.id ? action.payload : player
      );
    },
    deletePlayer: (state, action: PayloadAction<string>) => {
      return state.filter((player) => player.id !== action.payload);
    },
  },
});
export const { addPlayer, editPlayer, deletePlayer, setPlayers } =
  playersSlice.actions;
