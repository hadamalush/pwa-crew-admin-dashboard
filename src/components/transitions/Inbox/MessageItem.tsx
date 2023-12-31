import Button from "../../UI/Button";
import Icon from "../../UI/Icons/Icon";
import Avatar from "../Avatar";
import Container from "../../UI/Container";
import { cn } from "../../../util/utils";
import { markSingleMessage, messageProps } from "../../../global/message-slice";
import { format } from "date-fns";
import { useGlobalDispatch, useGlobalSelector } from "../../../global/hooks";
import { ChangeEvent, forwardRef } from "react";
import InputRef from "../../UI/Input/InputRef";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { axiosPrivate } from "../../../api/axios";
import { toast } from "sonner";
import { getUniqueMsgById } from "../../../global/message-action";
import usePage from "../../../hooks/usePage";

type dataMessage = {
  dataMessage: messageProps;
  pageName: "spam" | "trash" | "inbox" | "featured" | "sent";
};

const MessageItem = forwardRef<HTMLInputElement, dataMessage>(({ dataMessage, pageName }, ref) => {
  const dispatch = useGlobalDispatch();
  const { id, owner, subject, avatarSrc, isFeatured, unRead, date } = dataMessage;
  const [isFeaturedMess, setIsFeaturedMess] = useState(isFeatured);
  const stateMsg = useGlobalSelector((state) => state.messages);
  const quantityMsgs = getUniqueMsgById(stateMsg, owner, subject).length;
  const { path } = usePage();
  const newDate = new Date(date);
  const formattedDate = format(newDate, "dd MMM");

  useEffect(() => {
    setIsFeaturedMess(isFeatured);
  }, [isFeatured]);

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const action = e.target.checked ? "add" : "remove";

    dispatch(markSingleMessage({ id, action: action, pageName: pageName }));
  };

  const handleFeatured = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(markSingleMessage({ id, action: "featured", pageName: pageName }));
    setIsFeaturedMess((prev) => !prev);
    const mode = isFeaturedMess ? "remove" : "add";
    let res;

    try {
      res = await axiosPrivate.post("/admin/inbox/setFeatured", { mode: mode, messageId: id });
    } catch (err) {
      toast.error("Something went wrong");
      setIsFeaturedMess((prev) => !prev);
      return;
    }

    if (res.data?.error) {
      toast.error(res.data.error);
      setIsFeaturedMess((prev) => !prev);
    } else {
      toast.success(res.data.message);
    }
  };

  return (
    <li
      className={cn(
        `flex w-full mx-auto text-xl xlg:text-2xl text-black dark:text-textPrimary px-5 border-pLight dark:border-borderPrimary border-b
   md:py-3 md:px-10`,
        { "dark:bg-messageItemActive bg-slate-200": unRead }
      )}
    >
      {!path.includes("featured") && (
        <InputRef
          id={id}
          type="checkbox"
          onChange={(e) => handleCheckbox(e)}
          className="cursor-pointer"
          aria-label="Mark the message"
          ref={ref}
        />
      )}

      <Button
        variant="outline"
        className="h-max self-center"
        onClick={(e) => handleFeatured(e)}
        aria-label="Mark as featured"
      >
        <Icon
          iconName={isFeaturedMess ? "starFilled" : "star"}
          size="s1"
          color="gray"
          className={cn("mx-5 hidden md:block duration-200", {
            "text-orangeYellow": isFeaturedMess,
          })}
        />
      </Button>
      <Avatar
        src={avatarSrc ? avatarSrc : "/avatar.webp"}
        size="s2"
        className="hidden md:block self-center"
      />
      <NavLink
        to={id}
        className="w-9/12 xs:w-10/12 md:w-9/12 xlg:w-9/12  xxl:w-11/12 flex-col p-5 items-start"
      >
        <p className="text-ellipsis whitespace-nowrap overflow-hidden w-full font-semibold">
          {owner}
        </p>
        <Container as="div" className="w-full">
          <p className="text-ellipsis whitespace-nowrap overflow-hidden w-full">
            ( <strong>{quantityMsgs}</strong> ) {subject}
          </p>
        </Container>
      </NavLink>
      <Container as="div" className="flex-col mx-auto">
        <time>{formattedDate}</time>
        <Button
          variant="outline"
          className="h-max self-center"
          onClick={handleFeatured}
          aria-label="Mark as featured"
        >
          <Icon
            iconName={isFeaturedMess ? "starFilled" : "star"}
            size="s1"
            color="gray"
            className={cn("mt-2 md:hidden duration-200", {
              "text-orangeYellow": isFeaturedMess,
            })}
          />
        </Button>
      </Container>
    </li>
  );
});

export default MessageItem;
