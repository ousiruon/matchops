import { finances } from "@/data/finances";
import { Finance } from "@/data/types/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const financesSlice = createSlice({
  name: "finances",
  initialState: finances,
  reducers: {
    addFinance: (state, action: PayloadAction<Finance>) => {
      state.push(action.payload as Finance);
    },
    setFinances: (_state, action: PayloadAction<Finance[]>) => {
      return action.payload;
    },
    editFinance: (state, action: PayloadAction<Finance>) => {
      return state.map((single) =>
        single.id === action.payload.id ? action.payload : single
      );
    },
    deleteFinance: (state, action: PayloadAction<string>) => {
      return state.filter((single) => single.id !== action.payload);
    },
  },
});
export const { addFinance, setFinances, editFinance, deleteFinance } =
  financesSlice.actions;
