import { useGlobalSelector } from "../../global/hooks";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "../../util/utils";

type MainProps = ComponentPropsWithoutRef<"main">;

const Main = ({ children }: MainProps) => {
  const isVisibleNav = useGlobalSelector((state) => state.toggle.isVisibleNav);

  console.log(isVisibleNav);

  return (
    <main
      className={cn("dark:bg-black w-full min-h-screen md:pl-36 pt-28 duration-200", {
        "md:pl-96": isVisibleNav,
      })}
    >
      {children}
    </main>
  );
};

export default Main;
