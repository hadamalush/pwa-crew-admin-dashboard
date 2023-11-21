import Button from "../UI/Button";
import Icon from "../UI/Icons/Icon";
import { useNavigate } from "react-router-dom";
import { ComponentPropsWithoutRef } from "react";
import { useGlobalDispatch } from "../../global/hooks";
import { messageDetailsType, moveMessages } from "../../global/message-slice";

type ToolbarInboxDetailsType = {
  message: messageDetailsType;
} & ComponentPropsWithoutRef<"li">;

const ToolbarInboxDetails = ({ message }: ToolbarInboxDetailsType) => {
  const navigate = useNavigate();
  const dispatch = useGlobalDispatch();

  const handleMessagesMove = (moveTo: "trash" | "spam" | "inbox") => {
    dispatch(moveMessages({ moveTo: moveTo, id: message.id }));
  };

  return (
    <li className="px-10 py-2 dark:bg-navItemActive bg-slate-200 flex items-center">
      <Button
        onClick={() => navigate(-1)}
        className="mr-14 rounded-full hover:dark:bg-primaryLight hover:bg-slate-100 p-2 duration-200"
        aria-label="Previous page"
      >
        <Icon iconName="arrowLeft" className="dark:text-textPrimary text-gray" />
      </Button>
      {!message.isInTrash && (
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
      {(message.isInSpam || message.isInTrash) && (
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

      {!message.isInSpam && (
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
    </li>
  );
};

export default ToolbarInboxDetails;
