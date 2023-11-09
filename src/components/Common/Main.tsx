// import { useMediaQuery } from "react-responsive";
// import { useGlobalSelector } from "../../global/hooks";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "../../util/utils";

type MainProps = ComponentPropsWithoutRef<"main">;

const Main = ({ children }: MainProps) => {
  //   const theme = useGlobalSelector((state) => state.toggle.theme);
  //   const isMediumScreen = useMediaQuery({ minWidth: 1060 });

  //   console.log(theme);

  return <main className={cn("dark:bg-black w-full h-screen md:pl-36 pt-28")}>{children}</main>;
};
//md:pl-36

export default Main;
