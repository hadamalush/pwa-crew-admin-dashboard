import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const usePage = () => {
  const location = useLocation();
  const [path, setPath] = useState("");
  const [changedPathMess, setChangedPathMess] = useState(false);
  const [changePath, setChangedPath] = useState(false);

  useEffect(() => {
    if (location.pathname !== path) {
      setChangedPathMess(true);
      setPath(location.pathname);
    }

    if (location.pathname !== path) {
      setChangedPath(true);
      setPath(location.pathname);
    } else {
      setChangedPath(false);
      setPath(location.pathname);
    }
  }, [location, path]);

  return { changedPathMess, changePath, path };
};

export default usePage;
