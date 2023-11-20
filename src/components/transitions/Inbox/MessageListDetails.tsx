import { useGlobalSelector } from "../../../global/hooks";
import { cn } from "../../../util/utils";
import { basicVariant } from "../../variants/variants";
import { useParams } from "react-router";
import ToolbarInboxDetails from "../ToolbarInboxDetails";

const MessageListDetails = () => {
  const { messageId } = useParams();

  const messageItem = useGlobalSelector((state) =>
    state.messages.allMessages.find((val) => val.id === messageId)
  );
  console.log(messageItem);

  return (
    <ul
      className={cn(
        basicVariant({ box: "default" }),
        "w-full h-screen rounded-none md:rounded-xl overflow-hidden sm:mt-0 duration-200"
      )}
    >
      <ToolbarInboxDetails messageId={messageId} />
    </ul>
  );
};

export default MessageListDetails;
