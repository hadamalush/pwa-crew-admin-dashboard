import { useGlobalDispatch, useGlobalSelector } from "../../global/hooks";
import { cn } from "../../util/utils";
import Container from "../UI/Container";
import Icon from "../UI/Icons/Icon";
import Button from "../UI/Button";
import { handleInboxNav, handleNav } from "../../global/toggle-slice";

const ToolbarInbox = () => {
  const isVisibleMainNav = useGlobalSelector((state) => state.toggle.isVisibleNav);
  const isVisibleInboxNav = useGlobalSelector((state) => state.toggle.isVisibleInboxNav);
  const dispatch = useGlobalDispatch();

  const handleInboxNavChange = () => {
    dispatch(handleNav({ isVisibleNav: false }));
    dispatch(handleInboxNav({ isVisibleInboxNav: !isVisibleInboxNav }));
  };

  return (
    <Container
      className={cn(
        "rounded-none bg-slate-50 dark:bg-primaryDarkBrighter h-20 fixed top-28 right-0 md:left-[29rem] left-0 justify-end duration-200 z-40",
        { "md:left-[44rem]": isVisibleMainNav }
      )}
      as="div"
    >
      <input
        type="checkbox"
        className="cursor-pointer ml-5 mr-2 md:ml-20"
        aria-label="Mark the message"
      />
      <label className="dark:text-textPrimary mr-auto w-max text-xl md:text-2xl">Select all</label>

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
