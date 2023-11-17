import { useGlobalDispatch, useGlobalSelector } from "../../global/hooks";
import { cn } from "../../util/utils";
import Container from "../UI/Container";
import Icon from "../UI/Icons/Icon";
import Button from "../UI/Button";
import { handleInboxNav, handleNav } from "../../global/toggle-slice";
import { moveMessages, markAllMessage } from "../../global/message-slice";
import usePage from "../../hooks/usePage";

const ToolbarInbox = () => {
  const isVisibleMainNav = useGlobalSelector((state) => state.toggle.isVisibleNav);
  const isVisibleInboxNav = useGlobalSelector((state) => state.toggle.isVisibleInboxNav);
  const areAllMessagesMarked = useGlobalSelector((state) => state.messages.areMarkedAllMessages);
  const isMarkedCheckboxAll = useGlobalSelector((state) => state.messages.isMarkedCheckboxAll);
  const isCheckedMessage = useGlobalSelector((state) => state.messages.checkedMessages).length > 0;
  const { path } = usePage();

  const dispatch = useGlobalDispatch();

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

  return (
    <Container
      className={cn(
        "rounded-none bg-slate-50 dark:bg-primaryDarkBrighter h-20 fixed top-28 right-0 md:left-[29rem] left-0 justify-end duration-200 z-30",
        { "md:left-[44rem]": isVisibleMainNav }
      )}
      as="div"
    >
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
      </label>
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
            aria-label="navigation inbox menu"
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
            aria-label="navigation inbox menu"
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
            aria-label="navigation inbox menu"
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

      <p className="dark:text-textPrimary mr-5 text-xl">1-32 of 512</p>

      <Button
        variant="outline"
        className="group p-2 md:p-5 outline-none order-1 md:order-none"
        aria-label="Previous page"
        type="button"
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
      >
        <Icon
          iconName="arrowRightMini"
          size="s1_5"
          color="gray"
          className="group-hover:text-lightBlue"
        />
      </Button>

      <Button
        variant="outline"
        className="group p-5 pr-3 outline-none order-1 md:order-none md:hidden block"
        aria-label="navigation inbox menu"
        type="button"
        onClick={handleInboxNavChange}
      >
        <Icon iconName="menu" size="s1_5" color="gray" className=" group-hover:text-lightBlue" />
      </Button>
    </Container>
  );
};

export default ToolbarInbox;
