import { AxiosInstance } from "axios";
import { toast } from "sonner";

export const fetchStatsMongo = async (axiosPrivate: AxiosInstance) => {
  let response;

  try {
    response = await axiosPrivate.get("/admin/stats/mongoConnections");

    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    toast.error("An error occurred while downloading statistics from mongodb");
    return;
  }
  return 0;
};
