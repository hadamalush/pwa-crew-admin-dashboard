import { Outlet } from "react-router-dom";
import { InboxNavbarItems } from "../components/Common/Navigation/NavigationData";
import { useGlobalSelector } from "../global/hooks";
import { cn } from "../util/utils";
import Main from "../components/Common/Main";
import Navbar from "../components/Common/Navigation/Navbar";
import ToolbarInbox from "../components/transitions/ToolbarInbox";

const InboxLayout = () => {
  const isVisibleMainNav = useGlobalSelector((state) => state.toggle.isVisibleNav);
  const isVisibleInboxNav = useGlobalSelector((state) => state.toggle.isVisibleInboxNav);

  return (
    <>
      <Navbar
        data={InboxNavbarItems}
        id="inboxNav"
        className={cn(
          "z-0 md:left-36 md:w-80 pt-5 bg-slate-100 dark:bg-primaryDarkBrighter duration-200",
          { "md:left-96": isVisibleMainNav },
          {
            "translate-x-0": isVisibleInboxNav,
          }
        )}
      />
      <ToolbarInbox />
      <Main className="md:pl-[29rem]">
        <Outlet />
      </Main>
    </>
  );
};

export default InboxLayout;
