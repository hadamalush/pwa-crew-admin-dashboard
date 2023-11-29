import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "../config/config";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const token = Cookies.get("refreshToken");
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await axios({
        method: "delete",
        url: `${API_URL}/admin/auth/logout`,
        withCredentials: true,
        data: { token },
        responseType: "json",
      });

      const data = response.data;

      if (data?.logout) {
        Cookies.remove("refreshToken");
        Cookies.remove("accessToken");
        navigate("/");
      }
    } catch (err) {
      Cookies.remove("refreshToken");
      Cookies.remove("accessToken");
      navigate("/");
    }
  };

  return logout;
};

export default useLogout;
