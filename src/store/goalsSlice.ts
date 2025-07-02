import { goals } from "@/data/goals";
import { GoalScored } from "@/data/types/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const goalsSlice = createSlice({
  name: "goals",
  initialState: goals,
  reducers: {
    addGoal: (state, action: PayloadAction<GoalScored>) => {
      state.push(action.payload as GoalScored);
    },
    deleteGoal: (state, action: PayloadAction<string>) => {
      return state.filter((goal: GoalScored) => goal.id !== action.payload);
    },
    deleteGoalsByMatch: (state, action: PayloadAction<string>) => {
      return state.filter((goal: GoalScored) => goal.game !== action.payload);
    },
    setGoals: (_state, action: PayloadAction<GoalScored[]>) => {
      return action.payload;
    },
  },
});
export const { addGoal, deleteGoal, deleteGoalsByMatch, setGoals } =
  goalsSlice.actions;
