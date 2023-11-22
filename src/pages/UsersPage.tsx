import Main from "../components/Common/Main";
import Button from "../components/UI/Button";
import Container from "../components/UI/Container";
import Heading from "../components/UI/Heading";

const UsersPage = () => {
  return (
    <Main>
      <Container as="section" variant="flex" className="justify-start p-20">
        <Heading as="h1" className="text-3xl md:text-5xl dark:text-textPrimary">
          Users list
        </Heading>
        <Button variant="default" className="ml-auto px-4 md:text-2xl font-semibold" size="big">
          New user
        </Button>
      </Container>
      <Container variant="wrapper" as="section" className="p-0 md:p-10 ">
        dsd
      </Container>
    </Main>
  );
};

export default UsersPage;
