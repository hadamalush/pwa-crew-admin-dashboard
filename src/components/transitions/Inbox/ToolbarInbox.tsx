import { useGlobalDispatch, useGlobalSelector } from "../../../global/hooks";
import { cn } from "../../../util/utils";
import Container from "../../UI/Container";
import Icon from "../../UI/Icons/Icon";
import Button from "../../UI/Button";
import { handleInboxNav, handleNav } from "../../../global/toggle-slice";
import {
  moveMessages,
  markAllMessage,
  getNumberOfMessagesByPage,
  getInboxPage,
  changeCurrentPage,
} from "../../../global/message-slice";
import usePage from "../../../hooks/usePage";
import { useParams } from "react-router";
import { getMessIndex } from "../../../global/message-action";

const ToolbarInbox = () => {
  const dispatch = useGlobalDispatch();
  const toggleState = useGlobalSelector((state) => state.toggle);
  const messagesState = useGlobalSelector((state) => state.messages);
  const { path } = usePage();
  const { messageId } = useParams();

  const isVisibleMainNav = toggleState.isVisibleNav;
  const isVisibleInboxNav = toggleState.isVisibleInboxNav;
  const areAllMessagesMarked = messagesState.areMarkedAllMessages;
  const isMarkedCheckboxAll = messagesState.isMarkedCheckboxAll;
  const isCheckedMessage = messagesState.checkedMessages.length > 0;
  const lastIndexMess = getMessIndex(messagesState, "last");
  const firstIndexMess = getMessIndex(messagesState, "first");

  const quantityMessages = getNumberOfMessagesByPage(messagesState, getInboxPage(path));

  const handleInboxNavChange = () => {
    dispatch(handleNav({ isVisibleNav: false }));
    dispatch(handleInboxNav({ isVisibleInboxNav: !isVisibleInboxNav }));
  };

  const handleMessagesCheckbox = () => {
    dispatch(markAllMessage({ allMessagesMarked: !areAllMessagesMarked }));
  };

  const handleMessagesMove = (moveTo: "trash" | "spam" | "inbox") => {
    dispatch(moveMessages({ moveTo: moveTo }));
    dispatch(markAllMessage({ allMessagesMarked: false }));
  };

  const handleChangePage = (action: "previous" | "next") => {
    if (
      (lastIndexMess &&
        quantityMessages &&
        lastIndexMess > quantityMessages &&
        action === "next") ||
      quantityMessages === 0
    )
      return;
    dispatch(changeCurrentPage({ page: action }));
  };

  return (
    <Container
      className={cn(
        "rounded-none bg-slate-50 dark:bg-primaryDarkBrighter h-20 fixed top-28 right-0 md:left-[29rem] left-0 justify-end duration-200 z-30",
        { "md:left-[44rem]": isVisibleMainNav }
      )}
      as="div"
    >
      {!messageId && (
        <>
          <input
            type="checkbox"
            className="cursor-pointer ml-5 mr-2 md:ml-20"
            onChange={handleMessagesCheckbox}
            checked={isMarkedCheckboxAll}
            name="checkboxAll"
            id="checkboxAll"
          />
          <label
            htmlFor="checkboxAll"
            className="dark:text-textPrimary w-max text-xl md:text-2xl mr-auto sm:mr-0"
          >
            Select all
          </label>{" "}
        </>
      )}
      <Container
        as="div"
        className={cn(
          "mr-auto absolute left-0 bottom-[-4rem] invisible opacity-0 bg-slate-50 dark:bg-primaryDarkBrighter w-full justify-start h-16 sm:static sm:w-max sm:ml-2 duration-200",
          { "visible opacity-100": isCheckedMessage }
        )}
      >
        {isCheckedMessage && !path.includes("trash") && (
          <Button
            variant="outline"
            className="group pl-3 pr-3 outline-none order-1 md:order-none block"
            aria-label="Move to trash"
            type="button"
            onClick={() => handleMessagesMove("trash")}
          >
            <Icon
              iconName="trash"
              size="s1_5"
              color="yellow"
              className=" group-hover:text-lightBlue duration-200"
            />
          </Button>
        )}
        {isCheckedMessage && !path.includes("spam") && (
          <Button
            variant="outline"
            className="group p-5 pr-3 outline-none order-1 md:order-none block"
            aria-label="Move to spam"
            type="button"
            onClick={() => handleMessagesMove("spam")}
          >
            <Icon
              iconName="flame"
              size="s1_5"
              color="green"
              className=" group-hover:text-lightBlue duration-200"
            />
          </Button>
        )}
        {isCheckedMessage && path !== "/inbox" && (
          <Button
            variant="outline"
            className="group p-5 pr-3 outline-none order-1 md:order-none block"
            aria-label="Move to inbox"
            type="button"
            onClick={() => handleMessagesMove("inbox")}
          >
            <Icon
              iconName="inbox"
              size="s1_5"
              color="purple"
              className=" group-hover:text-lightBlue duration-200"
            />
          </Button>
        )}
      </Container>

      {!messageId && quantityMessages !== 0 && (
        <p className="dark:text-textPrimary mr-5 text-xl">
          {(firstIndexMess && firstIndexMess + 1) || (!firstIndexMess && 1)} &nbsp;- &nbsp;
          {lastIndexMess && quantityMessages && lastIndexMess > quantityMessages
            ? quantityMessages
            : lastIndexMess}{" "}
          of {quantityMessages}
        </p>
      )}

      {!messageId && quantityMessages && quantityMessages > 0 && (
        <>
          <Button
            variant="outline"
            className="group p-2 md:p-5 outline-none order-1 md:order-none"
            aria-label="Previous page"
            type="button"
            onClick={() => handleChangePage("previous")}
          >
            <Icon
              iconName="arrowLeftMini"
              size="s1_5"
              color="gray"
              className="group-hover:text-lightBlue"
            />
          </Button>

          <Button
            variant="outline"
            className="group p-2 md:p-5 outline-none order-1 md:order-none"
            aria-label="Next page"
            type="button"
            onClick={() => handleChangePage("next")}
          >
            <Icon
              iconName="arrowRightMini"
              size="s1_5"
              color="gray"
              className="group-hover:text-lightBlue"
            />
          </Button>
        </>
      )}

      <Button
        variant="outline"
        className="group p-5 pr-3 outline-none order-1 md:order-none md:hidden block"
        aria-label="Mark as featured"
        type="button"
        onClick={handleInboxNavChange}
      >
        <Icon iconName="menu" size="s1_5" color="gray" className=" group-hover:text-lightBlue" />
      </Button>
    </Container>
  );
};

export default ToolbarInbox;
