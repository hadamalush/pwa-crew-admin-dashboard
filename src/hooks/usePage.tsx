import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const usePage = (mode?: "inbox") => {
  const location = useLocation();
  const [path, setPath] = useState("");
  const [changedPathMess, setChangedPathMess] = useState(false);
  const [changePath, setChangedPath] = useState(false);

  useEffect(() => {
    if (location.pathname !== path) {
      setChangedPathMess(true);
      setChangedPath(true);
      setPath(location.pathname);
    } else {
      if (mode !== "inbox") {
        setChangedPath(false);
        setPath(location.pathname);
      }
    }
  }, [location, path, mode]);

  return { changedPathMess, changePath, path };
};

export default usePage;
