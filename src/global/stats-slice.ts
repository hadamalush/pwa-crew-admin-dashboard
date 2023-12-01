import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type mongoConnType = {
  current: number;
  percentages: number;
  available: number;
};

type pagesViewsType = {
  views: number;
  percentages: number;
};

export type StatsState = {
  mongoConns: mongoConnType;
  pagesViews: pagesViewsType;
};

const initialState: StatsState = {
  mongoConns: {
    current: 0,
    percentages: 0,
    available: 0,
  },

  pagesViews: {
    views: 0,
    percentages: 0,
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
    setPageViews(state, action: PayloadAction<{ views: number }>) {
      const pageViews = action.payload.views;
      const percentages = parseFloat(((pageViews / 50) * 100).toFixed(2));

      state.pagesViews.views = pageViews;
      state.pagesViews.percentages = percentages;
    },
  },
});

export const { setMongoStats, setPageViews } = statsSlice.actions;
