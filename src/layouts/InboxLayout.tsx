import { Outlet, useLocation } from "react-router-dom";
import { InboxNavbarItems } from "../components/Common/Navigation/NavigationData";
import { useGlobalSelector } from "../global/hooks";
import { cn } from "../util/utils";
import Main from "../components/Common/Main";
import Navbar from "../components/Common/Navigation/Navbar";
import ToolbarInbox from "../components/transitions/ToolbarInbox";

const InboxLayout = () => {
  const isVisibleMainNav = useGlobalSelector((state) => state.toggle.isVisibleNav);
  const isVisibleInboxNav = useGlobalSelector((state) => state.toggle.isVisibleInboxNav);
  const pathname = useLocation().pathname;
  const isInboxPage = pathname.includes("inbox");

  return (
    <>
      <Navbar
        data={InboxNavbarItems}
        id="inboxNav"
        className={cn(
          " md:left-36 md:w-80 pt-5 bg-slate-50 dark:bg-primaryDarkBrighter duration-200 z-40",
          { "md:left-96": isVisibleMainNav },
          {
            "translate-x-0": isVisibleInboxNav,
          }
        )}
      />
      <ToolbarInbox />
      <Main
        className={cn("md:pl-[29rem] pt-48 ", {
          "md:pl-[44rem]": isInboxPage && isVisibleMainNav,
        })}
      >
        <Outlet />
      </Main>
    </>
  );
};

export default InboxLayout;
