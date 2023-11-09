import Main from "../components/Common/Main";
import Container from "../components/UI/Container";
import Advertisement from "../components/transitions/Advertisement";

const DashBoardPage = () => {
  return (
    <Main>
      <Container as="div" variant="wrapper">
        <Advertisement />
      </Container>
    </Main>
  );
};

export default DashBoardPage;
