import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface mongoConnType {
  current: number;
  percentages: number;
  available: number;
}

export type StatsState = {
  mongoConns: mongoConnType | null;
};

const initialState: StatsState = {
  mongoConns: null,
};

export const statsSlice = createSlice({
  name: "stats",
  initialState: initialState,
  reducers: {
    setMongoStats(state, action: PayloadAction<{ mongodata: mongoConnType }>) {
      const mongoData = action.payload.mongodata;
      if (mongoData) {
        const percentages = (mongoData.current / mongoData.available) * 100;

        if (state.mongoConns) {
          state.mongoConns.percentages = percentages;
          state.mongoConns.current = mongoData.current;
        }
      }
    },
  },
});

export const { setMongoStats } = statsSlice.actions;
