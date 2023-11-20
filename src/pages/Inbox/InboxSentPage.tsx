import Container from "../../components/UI/Container";
import MessagesList from "../../components/transitions/Inbox/MessagesList";

const InboxSentPage = () => {
  return (
    <Container variant="wrapper" as="section" className="p-0 md:p-10 ">
      <MessagesList pageName="spam" />
    </Container>
  );
};

export default InboxSentPage;
