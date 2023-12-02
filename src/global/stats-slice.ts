import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { UserProps } from "./user-slice";
import { getLastWeek } from "./user-action";
import { parseISO, format } from "date-fns";

type mongoConnType = {
  current: number;
  percentages: number;
  available: number;
};

type pagesViewsType = {
  views: number;
  percentages: number;
};
type usersType = {
  numberUsers: number;
  percentages: number;
  regUsersLastWeek: Array<number>;
};

export type StatsState = {
  mongoConns: mongoConnType;
  pagesViews: pagesViewsType;
  users: usersType;
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
  users: {
    numberUsers: 0,
    percentages: 0,
    regUsersLastWeek: [0, 0, 0, 0, 0, 0, 0],
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

      //temporary calculations
      const percentages = parseFloat(((pageViews / 50) * 100).toFixed(2));

      state.pagesViews.views = pageViews;
      state.pagesViews.percentages = percentages;
    },
    setUsersStats(state, action: PayloadAction<{ users: UserProps[] }>) {
      const users = action.payload.users;
      const numberUsers = users.length;

      //temporary calculations
      const percentages = parseFloat(((numberUsers / 10) * 100).toFixed(2));
      state.users.numberUsers = numberUsers;
      state.users.percentages = percentages;

      //Registered users since last week.

      const datesLastWeek = getLastWeek();
      const formattedUserDates = users.map((user) => {
        const parsedDate = parseISO(user.createAt);
        const formattedDate = format(parsedDate, "d.MM.yyyy");

        return formattedDate;
      });

      for (let i = 0; i < 7; i++) {
        state.users.regUsersLastWeek[i] = formattedUserDates.filter(
          (date) => date === datesLastWeek[i]
        ).length;
      }
    },
  },
});

export const { setMongoStats, setPageViews, setUsersStats } = statsSlice.actions;
