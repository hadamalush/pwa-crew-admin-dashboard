import axios from "axios";
import { API_URL } from "../../config/config";

export const fetchStatsMongo = async () => {
  try {
    const response = await axios({
      method: "get",
      url: `${API_URL}/admin/stats/mongoConnections`,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
