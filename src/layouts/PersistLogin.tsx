import { Outlet } from "react-router";
import { useEffect, useState } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import { useGlobalSelector } from "../global/hooks";
import { useNavigate } from "react-router-dom";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const auth = useGlobalSelector((state) => state.auth.auth);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        const token = await refresh();

        if (!token) {
          console.log("dsd");
          return navigate("/");
        }
      } catch (err) {
        return navigate("/");
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    if (!auth) isMounted = false;
  }, [refresh, navigate, auth]);

  return <>{!isLoading && <Outlet />}</>;
};

export default PersistLogin;
