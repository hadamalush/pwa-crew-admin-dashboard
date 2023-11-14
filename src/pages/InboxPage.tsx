import Container from "../components/UI/Container";
import MessagesList from "../components/transitions/Inbox/MessagesList";
import { basicVariant } from "../components/variants/variants";
import { cn } from "../util/utils";

const InboxPage = () => {
  return (
    <Container variant="wrapper" as="section" className="p-0 md:p-10 ">
      <ul
        className={cn(
          basicVariant({ box: "default" }),
          "w-full h-screen rounded-none md:rounded-xl"
        )}
      >
        <MessagesList />
      </ul>
    </Container>
  );
};

export default InboxPage;
