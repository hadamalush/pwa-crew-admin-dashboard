import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "../config/config";
import { useNavigate } from "react-router-dom";
import { useGlobalDispatch } from "../global/hooks";
import { setLoading } from "../global/toggle-slice";
import { toast } from "sonner";

const useLogout = () => {
  const token = Cookies.get("refreshToken");
  const navigate = useNavigate();
  const dispatch = useGlobalDispatch();

  const logout = async () => {
    dispatch(setLoading({ loading: true }));

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
        dispatch(setLoading({ loading: false }));
        toast.success("Successfully logged out");
        Cookies.remove("refreshToken");
        Cookies.remove("accessToken");
        navigate("/");
      }
    } catch (err) {
      dispatch(setLoading({ loading: false }));
      Cookies.remove("refreshToken");
      Cookies.remove("accessToken");
      navigate("/");
    }
  };

  return logout;
};

export default useLogout;
