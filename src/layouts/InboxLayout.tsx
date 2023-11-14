import { Outlet } from "react-router-dom";
import { InboxNavbarItems } from "../components/Common/Navigation/NavigationData";
import { useGlobalSelector } from "../global/hooks";
import { cn } from "../util/utils";
import Main from "../components/Common/Main";
import Navbar from "../components/Common/Navigation/Navbar";

const InboxLayout = () => {
  const isVisibleMainNav = useGlobalSelector((state) => state.toggle.isVisibleNav);

  return (
    <>
      <Navbar
        data={InboxNavbarItems}
        id="inboxNav"
        className={cn(
          "z-0 md:left-36 md:w-80 pt-5 bg-slate-100 dark:bg-primaryDarkBrighter duration-200",
          { "md:left-96": isVisibleMainNav }
        )}
      />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

export default InboxLayout;
