import Button from "../../UI/Button";
import Icon from "../../UI/Icons/Icon";
import { useNavigate } from "react-router-dom";
import { type ComponentPropsWithoutRef, useState } from "react";
import { useGlobalDispatch, useGlobalSelector } from "../../../global/hooks";
import {
  deleteMessages,
  messageDetailsType,
  moveMessages,
  setCheckedMessages,
} from "../../../global/message-slice";
import { getUniqueMsgById } from "../../../global/message-action";
import { setLoading } from "../../../global/toggle-slice";
import useAxiosPrivate from "../../../hooks/usePrivateAxios";
import { toast } from "sonner";
import Heading from "../../UI/Heading";
import Container from "../../UI/Container";
import Modal from "../Modal";
import { AnimatePresence } from "framer-motion";
import usePage from "../../../hooks/usePage";

type ToolbarInboxDetailsType = {
  message: messageDetailsType;
} & ComponentPropsWithoutRef<"li">;

const ToolbarInboxDetails = ({ message }: ToolbarInboxDetailsType) => {
  const navigate = useNavigate();
  const msgState = useGlobalSelector((state) => state.messages);
  const dispatch = useGlobalDispatch();
  const axiosPrivate = useAxiosPrivate();
  const messages = getUniqueMsgById(msgState, message.owner, message.subject);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { path } = usePage();

  const handleMessagesMove = async (moveTo: "trash" | "spam" | "inbox") => {
    dispatch(setCheckedMessages({ checkedMessages: messages }));
    dispatch(setLoading({ loading: true }));
    let res;
    try {
      res = await axiosPrivate.post("/admin/inbox/moveMessages", {
        mode: moveTo,
        messages: messages,
      });
    } catch (err) {
      dispatch(setLoading({ loading: false }));
      toast.error("Failed to move messages");
      return;
    }

    if (res.data?.error) {
      dispatch(setLoading({ loading: false }));
      toast.error(res.data.error);
      return;
    } else {
      toast.success(res.data.message);
    }

    dispatch(moveMessages({ moveTo: moveTo }));
    dispatch(setLoading({ loading: false }));
  };

  const handleDeleteMessage = async () => {
    dispatch(setCheckedMessages({ checkedMessages: messages }));

    setIsModalOpen(false);
    dispatch(setLoading({ loading: true }));
    let res;

    try {
      res = await axiosPrivate.post("/admin/inbox/deletePermanent", messages);

      console.log(res);
    } catch (err) {
      dispatch(setLoading({ loading: false }));
      toast.error("Failed to move messages");
      return;
    }

    if (res.data?.error) {
      dispatch(setLoading({ loading: false }));
      toast.error(res.data.error);
      return;
    } else {
      toast.success(res.data.message);
    }

    dispatch(deleteMessages());
    dispatch(setLoading({ loading: false }));
  };

  return (
    <>
      <AnimatePresence>
        {isModalOpen && (
          <Modal
            onClose={() => setIsModalOpen(false)}
            className="sm:w-[50rem]  h-full sm:h-auto overflow-y-auto rounded-none sm:rounded-xl"
            title="Delete messages"
          >
            <Heading as="h3" className="text-center py-10 text-lightRed font-bold">
              Are you sure to delete messages?
            </Heading>
            <Container className="flex gap-5">
              <Button
                variant="default"
                size="big"
                className="mb-20 mt-10 px-14"
                onClick={() => {
                  document.body.classList.remove("bodyhidden");
                  setIsModalOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                size="big"
                className="mb-20 mt-10 px-14"
                onClick={() => {
                  document.body.classList.remove("bodyhidden");
                  handleDeleteMessage();
                }}
              >
                Confirm
              </Button>
            </Container>
          </Modal>
        )}
      </AnimatePresence>
      <li className="px-10 py-2 dark:bg-navItemActive bg-slate-200 flex items-center">
        <Button
          onClick={() => navigate(-1)}
          className="mr-14 rounded-full hover:dark:bg-primaryLight hover:bg-slate-100 p-2 duration-200"
          aria-label="Previous page"
        >
          <Icon iconName="arrowLeft" className="dark:text-textPrimary text-gray" />
        </Button>

        <Button
          variant="outline"
          className="group pl-3 pr-3 outline-none order-1 md:order-none block"
          aria-label="navigation inbox menu"
          type="button"
          onClick={() => {
            if (!path.includes("trash")) return handleMessagesMove("trash");
            setIsModalOpen(true);
          }}
        >
          <Icon
            iconName="trash"
            size="s1_5"
            color="yellow"
            className=" group-hover:text-lightBlue duration-200"
          />
        </Button>

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
    </>
  );
};

export default ToolbarInboxDetails;
