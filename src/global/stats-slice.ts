import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { UserProps } from "./user-slice";
import { getLastWeek } from "./user-action";
import { parseISO, format } from "date-fns";

export type storageType = {
  [key: string]: {
    labels: string;
    data: number[];
    color: string;
  };
};

type cloudinaryStatsType = {
  usage: number;
  limit: number;
  used_percent: number;
};

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
  storage: storageType;
  mongoConns: mongoConnType; // mongodb
  pagesViews: pagesViewsType; // statistics from google api analitycs for https://pwa-crew-site-demo.vercel.app/
  users: usersType;
};

const initialState: StatsState = {
  storage: {
    cloudinary: {
      labels: "cloudinary",
      data: [0, 0],
      color: "#0090e7",
    },
    mega: {
      labels: "mega",
      data: [0, 0],
      color: "#fc424a",
    },
    vercelblob: {
      labels: "vercelblob",
      data: [0, 0],
      color: "#eb904d",
    },
  },

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
    setCloudinaryStats(state, action: PayloadAction<{ cldData: cloudinaryStatsType }>) {
      const cldData = action.payload.cldData;
      if (cldData) {
        const usageConvertedToMB = cldData.usage * 1000;
        const limitConvertedToMB = cldData.limit * 1000;
        const freeSpace = parseFloat((limitConvertedToMB - usageConvertedToMB).toFixed(2));

        state.storage.cloudinary.data = [usageConvertedToMB, freeSpace];
      }
    },
    setMegaStats(state, action: PayloadAction<{ megaData: cloudinaryStatsType }>) {
      const megaData = action.payload.megaData;
      if (megaData) {
        const freeSpace = parseFloat((megaData.limit - megaData.usage).toFixed(2));

        state.storage.mega.data = [megaData.usage, freeSpace];
      }
    },
    setVercelStats(state, action: PayloadAction<{ vercelData: cloudinaryStatsType }>) {
      const vercelData = action.payload.vercelData;
      if (vercelData) {
        const freeSpace = parseFloat((vercelData.limit - vercelData.usage).toFixed(2));

        state.storage.vercelblob.data = [vercelData.usage, freeSpace];
      }
    },
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

export const {
  setMongoStats,
  setPageViews,
  setUsersStats,
  setCloudinaryStats,
  setMegaStats,
  setVercelStats,
} = statsSlice.actions;
