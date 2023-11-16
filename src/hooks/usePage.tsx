import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const usePage = () => {
  const location = useLocation();
  const [prevPath, setPrevPath] = useState("");
  const [changedPath, setChangedPath] = useState(false);

  useEffect(() => {
    if (location.pathname !== prevPath) {
      setChangedPath(true);
      setPrevPath(location.pathname);
    }
  }, [location, prevPath]);

  return { changedPath, prevPath };
};

export default usePage;
