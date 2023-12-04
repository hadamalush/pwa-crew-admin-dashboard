import { useGlobalDispatch, useGlobalSelector } from "../global/hooks";
import { handleTheme } from "../global/toggle-slice";

const useTheme = () => {
  const dispatch = useGlobalDispatch();
  const theme = useGlobalSelector((state) => state.toggle.theme);

  const setTheme = (theme: "dark" | "light") => {
    dispatch(handleTheme({ theme: theme }));
  };

  return { theme, setTheme };
};

export default useTheme;
