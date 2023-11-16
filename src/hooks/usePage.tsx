import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const usePage = () => {
  const location = useLocation();
  const [path, setPath] = useState("");
  const [changedPath, setChangedPath] = useState(false);

  useEffect(() => {
    if (location.pathname !== path) {
      setChangedPath(true);
      setPath(location.pathname);
    }
  }, [location, path]);

  return { changedPath, path };
};

export default usePage;
