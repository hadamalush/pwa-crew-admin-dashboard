import Container from "../../components/UI/Container";
import MessageListDetails from "../../components/transitions/Inbox/MessageListDetails";

const InboxMessageDetailsPage = () => {
  return (
    <Container variant="wrapper" as="section" className="p-0 md:p-10 ">
      <MessageListDetails />
    </Container>
  );
};

export default InboxMessageDetailsPage;
