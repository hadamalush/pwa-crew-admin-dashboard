import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "../config/config";

const useRefreshToken = () => {
  const refresh = async () => {
    const token = Cookies.get("refreshToken");

    try {
      const response = await axios({
        method: "post",
        url: `${API_URL}/admin/auth/refreshToken`,
        withCredentials: true,
        data: {
          token: token,
        },
        responseType: "json",
      });

      const data = await response.data;

      if (data) {
        Cookies.set("accessToken", data.accessToken, { expires: 7, secure: true });
        return data.accessToken;
      }
    } catch (err: unknown) {
      console.log(err);
    }
  };

  return refresh;
};

export default useRefreshToken;
