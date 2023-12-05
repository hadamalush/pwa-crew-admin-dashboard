import { Outlet, useLoaderData, useLocation } from "react-router-dom";
import { InboxNavbarItems } from "../components/Common/Navigation/NavigationData";
import { useGlobalSelector } from "../global/hooks";
import { cn } from "../util/utils";
import Main from "../components/Common/Main";
import Navbar from "../components/Common/Navigation/Navbar";
import ToolbarInbox from "../components/transitions/Inbox/ToolbarInbox";
import usePage from "../hooks/usePage";
import { useDispatch } from "react-redux";
import { resetCurrentPage } from "../global/message-slice";
import { useEffect } from "react";
import { fetchAllMessages } from "../util/actions/actions";
import useAxiosPrivate from "../hooks/usePrivateAxios";

const InboxLayout = () => {
  const isVisibleMainNav = useGlobalSelector((state) => state.toggle.isVisibleNav);
  const isVisibleInboxNav = useGlobalSelector((state) => state.toggle.isVisibleInboxNav);

  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const pathname = useLocation().pathname;
  const isInboxPage = pathname.includes("inbox");
  const { changePath } = usePage();

  useEffect(() => {
    if (changePath) {
      dispatch(resetCurrentPage());
    }
  }, [dispatch, changePath]);

  useEffect(() => {
    const fetchDataInBackground = async () => {
      let token,
        newLabel: "SPAM" | "TRASH" | "INBOX" = "SPAM",
        isCountinue = true;
      while (isCountinue) {
        const response = await fetchAllMessages(axiosPrivate, dispatch, newLabel, token);

        token = response.newPageToken;
        newLabel = response.newLabel;

        if (newLabel === "INBOX" && token === "") {
          isCountinue = false;
        }

        if (token === "" && newLabel === "SPAM") {
          newLabel = "TRASH";
        } else if (token === "" && newLabel === "TRASH") {
          newLabel = "INBOX";
        }

        if (!newLabel) {
          isCountinue = false;
        }
      }
    };
    fetchDataInBackground();
  }, [axiosPrivate, dispatch]);

  const ok = useLoaderData();

  if (!ok) {
    return null;
  }

  return (
    <>
      <Navbar
        data={InboxNavbarItems}
        id="inboxNav"
        isAdditionalInfo={true}
        className={cn(
          " md:left-36 md:w-80 pt-5 bg-slate-50 dark:bg-primaryDarkBrighter duration-200 z-40 mt-20 md:mt-0",
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
