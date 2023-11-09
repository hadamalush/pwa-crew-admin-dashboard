import Container from "../components/UI/Container";
import Advertisement from "../components/transitions/Advertisement";

const DashBoardPage = () => {
  return (
    <main className="dark:bg-black w-full h-screen md:pl-36 pt-28">
      <Container as="div" variant="wrapper">
        <Advertisement />
      </Container>
    </main>
  );
};

export default DashBoardPage;
