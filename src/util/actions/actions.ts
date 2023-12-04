import { AxiosInstance } from "axios";

import {
  setCloudinaryStats,
  setMegaStats,
  setMongoStats,
  setPageViews,
  setVercelStats,
} from "../../global/stats-slice";
import { AppDispatch } from "../../global/store";
import { setUsers } from "../../global/user-slice";
import { setAllMessages } from "../../global/message-slice";

export const fetchStatsMongo = async (axiosPrivate: AxiosInstance, dispatch: AppDispatch) => {
  let response;

  try {
    response = await axiosPrivate.get("/admin/stats/mongoConnections");

    if (response.status === 200) {
      dispatch(setMongoStats({ mongodata: response.data }));

      return "Mongo statistics updated";
    }
  } catch (err) {
    return "An error occurred while downloading statistics from mongodb";
  }

  return "An error occurred while downloading statistics from mongodb";
};

export const fetchPageViews = async (axiosPrivate: AxiosInstance, dispatch: AppDispatch) => {
  let response;

  try {
    response = await axiosPrivate.get("/admin/stats/pageViews");

    if (response.status === 200) {
      dispatch(setPageViews({ views: response.data }));

      return "The page views have been updated";
    }
  } catch (err) {
    return "An error occurred while updating page views";
  }

  return "An error occurred while updating page views";
};

export const fetchUsers = async (axiosPrivate: AxiosInstance, dispatch: AppDispatch) => {
  let response;

  try {
    response = await axiosPrivate.get("/admin/users");

    if (response.status === 200) {
      dispatch(setUsers({ users: response.data }));

      return { mess: "The users have been updated", users: response.data };
    }
  } catch (err) {
    return { mess: "An error occurred while updating users" };
  }

  return { mess: "An error occurred while updating users" };
};

export const fetchStatsCloudinary = async (axiosPrivate: AxiosInstance, dispatch: AppDispatch) => {
  let response;

  try {
    response = await axiosPrivate.get("/admin/stats/cloudinary");

    if (response.status === 200) {
      dispatch(setCloudinaryStats({ cldData: response.data }));

      return "The cloudinary statistics have been updated";
    }
  } catch (err) {
    return "An error occurred while cloudinary statistics";
  }

  return "An error occurred while cloudinary statistics";
};

export const fetchStatsMega = async (axiosPrivate: AxiosInstance, dispatch: AppDispatch) => {
  let response;

  try {
    response = await axiosPrivate.get("/admin/stats/mega");

    if (response.status === 200) {
      dispatch(setMegaStats({ megaData: response.data }));

      return "The mega.nz statistics have been updated";
    }
  } catch (err) {
    return "An error occurred while mega.nz statistics";
  }

  return "An error occurred while mega.nz statistics";
};

export const fetchStatsVercel = async (axiosPrivate: AxiosInstance, dispatch: AppDispatch) => {
  let response;

  try {
    response = await axiosPrivate.get("/admin/stats/vercel");

    if (response.status === 200) {
      dispatch(setVercelStats({ vercelData: response.data }));

      return "Vercel blob statistics updated";
    }
  } catch (err) {
    return "An error occurred while downloading statistics from vercel blob";
  }

  return "An error occurred while downloading statistics from vercel blob";
};

export const fetchAllMessages = async (axiosPrivate: AxiosInstance, dispatch: AppDispatch) => {
  let response;

  try {
    response = await axiosPrivate.get("/admin/inbox");

    if (response.status === 200) {
      dispatch(setAllMessages({ allMessages: response.data }));

      return "Messages updated";
    }
  } catch (err) {
    return "An error occurred while downloading messages";
  }

  return "An error occurred while downloading messages";
};
