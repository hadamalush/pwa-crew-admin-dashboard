import Container from "../../components/UI/Container";
import MessagesList from "../../components/transitions/Inbox/MessagesList";

const InboxTrash = () => {
  return (
    <Container variant="wrapper" as="section" className="p-0 md:p-10 ">
      <MessagesList pageName="trash" />
    </Container>
  );
};

export default InboxTrash;
