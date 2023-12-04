import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { API_URL } from "../config/config";
import { useGlobalDispatch } from "../global/hooks";
import { setAuth } from "../global/auth-slice";
import { setLoading } from "../global/toggle-slice";
import { toast } from "sonner";

const useRefreshToken = () => {
  const dispatch = useGlobalDispatch();
  const refresh = async () => {
    dispatch(setLoading({ loading: true }));
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
        dispatch(setLoading({ loading: false }));
        Cookies.set("accessToken", data.accessToken, { expires: 7, secure: true });
        dispatch(setAuth({ authData: data }));
        return data.accessToken;
      }
    } catch (err) {
      const error = err as AxiosError;

      dispatch(setLoading({ loading: false }));
      const message = (error.response?.data as AxiosError)?.message;

      if (message) {
        toast.error(message);
        return;
      }
      toast.error("An error occurred, please try again");
    }
  };

  return refresh;
};

export default useRefreshToken;
