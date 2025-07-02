import { cards } from "@/data/cards";
import { Card } from "@/data/types/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const cardsSlice = createSlice({
  name: "cards",
  initialState: cards,
  reducers: {
    addCard: (state, action: PayloadAction<Card>) => {
      state.push(action.payload as Card);
    },
    deleteCard: (state, action: PayloadAction<string>) => {
      return state.filter((card: Card) => card.id !== action.payload);
    },
    deleteCardsByMatch: (state, action: PayloadAction<string>) => {
      return state.filter((goal: Card) => goal.game !== action.payload);
    },
    setCards: (_state, action: PayloadAction<Card[]>) => {
      return action.payload;
    },
  },
});
export const { addCard, deleteCard, deleteCardsByMatch, setCards } = cardsSlice.actions;
