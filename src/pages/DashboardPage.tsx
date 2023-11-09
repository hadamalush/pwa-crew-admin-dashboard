import Main from "../components/Common/Main";
import Container from "../components/UI/Container";
import Advertisement from "../components/transitions/Advertisement";
import Card from "../components/transitions/Card";

const DUMMY_INFO = [
  { id: "e1", title: "Page views", quantity: 959, percentages: 3.59 },
  { id: "e2", title: "Base connections", quantity: 201, percentages: 71.59 },
  { id: "e3", title: "Number of errors ", quantity: 2, percentages: 2.33 },
  { id: "e4", title: "Number of users", quantity: 30, percentages: 30 },
];
const DashBoardPage = () => {
  return (
    <Main>
      <Container as="div" variant="wrapper">
        <Advertisement />
        <Container
          as="section"
          variant="grid"
          className="grid-cols-1 gap-5 sm:grid-cols-2 xlg:grid-cols-4"
        >
          {DUMMY_INFO.map((item) => (
            <Card {...item} />
          ))}
          {/* <Card />
          <Card />
          <Card />
          <Card /> */}
        </Container>
      </Container>
    </Main>
  );
};

export default DashBoardPage;
