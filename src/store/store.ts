import { configureStore } from "@reduxjs/toolkit";
import { playersSlice } from "./playersSlice";
import { competitionsSlice } from "./competitionsSlice";
import { matchesSlice } from "./matchesSlice";
import { seasonsSlice } from "./seasonsSlice";
import { goalsSlice } from "./goalsSlice";
import { cardsSlice } from "./cardsSlice";
import { financesSlice } from "./financesSlice";
import { loginSlice } from "./loginSlice";
import { settingsSlice } from "./settingsSlice";

export const store = configureStore({
  reducer: {
    players: playersSlice.reducer,
    competitions: competitionsSlice.reducer,
    matches: matchesSlice.reducer,
    seasons: seasonsSlice.reducer,
    goals: goalsSlice.reducer,
    cards: cardsSlice.reducer,
    finances: financesSlice.reducer,
    login: loginSlice.reducer,
    settings: settingsSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
