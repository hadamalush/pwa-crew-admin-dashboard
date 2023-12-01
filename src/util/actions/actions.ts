import { AxiosInstance } from "axios";

import { setMongoStats, setPageViews } from "../../global/stats-slice";
import { AppDispatch } from "../../global/store";

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
