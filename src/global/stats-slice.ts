import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface mongoConnType {
  current: number;
  percentages: number;
  available: number;
}

export type StatsState = {
  mongoConns: mongoConnType;
};

const initialState: StatsState = {
  mongoConns: {
    current: 0,
    percentages: 0,
    available: 0,
  },
};

export const statsSlice = createSlice({
  name: "stats",
  initialState: initialState,
  reducers: {
    setMongoStats(state, action: PayloadAction<{ mongodata: mongoConnType }>) {
      const mongoData = action.payload.mongodata;
      if (mongoData) {
        const percentages = parseFloat(
          ((mongoData.current / mongoData.available) * 100).toFixed(2)
        );

        state.mongoConns.percentages = percentages;
        state.mongoConns.current = mongoData.current;
      }
    },
  },
});

export const { setMongoStats } = statsSlice.actions;
