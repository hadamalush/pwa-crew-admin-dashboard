import Main from "../components/Common/Main";
import Container from "../components/UI/Container";
import { IconNameType } from "../components/UI/Icons/IconBase";
import Advertisement from "../components/transitions/Advertisement";
import CardStats from "../components/transitions/Cards/CardStats";
import CardStorage from "../components/transitions/Cards/CardStorage";
import CardUsersStats from "../components/transitions/Cards/CardUsersStat";
import UsersList from "../components/transitions/Users/UsersList";
import { DUMMY_STORAGE } from "../components/transitions/dummy-items";
import { useGlobalSelector } from "../global/hooks";

type DUMMY_INFOTYPE = {
  id: string;
  title: string;
  quantity: number;
  percentages: number;
  iconName: IconNameType;
};

const DUMMY_INFO: DUMMY_INFOTYPE[] = [
  { id: "e1", title: "Page views", iconName: "eyeUp", quantity: 959, percentages: -3.59 },
  {
    id: "e2",
    title: "Base connections",
    iconName: "cloudConnections",
    quantity: 201,
    percentages: 71.59,
  },
  { id: "e3", title: "Number of errors ", iconName: "warning", quantity: 2, percentages: -2.33 },
  { id: "e4", title: "Number of users", iconName: "usersPlus", quantity: 30, percentages: 30 },
];
const DashBoardPage = () => {
  const connections = useGlobalSelector((state) => state.toggle.stats);

  return (
    <Main>
      <Container as="div" variant="wrapper">
        <Advertisement />
        <Container
          as="section"
          variant="grid"
          className="grid-cols-1 gap-5 sm:grid-cols-2 xlg:grid-cols-4"
        >
          {DUMMY_INFO.map((item, index) => {
            console.log(index);

            return (
              <CardStats
                key={item.id}
                {...item}
                quantity={index === 1 ? connections : item.quantity}
              />
            );
          })}
        </Container>
        <Container as="section" variant="flex" className="flex-col gap-10 md:flex-row">
          <CardStorage dataStorage={DUMMY_STORAGE} className="md:w-2/6" />
          <CardUsersStats className="md:w-4/6" />
        </Container>
        <Container
          as="section"
          variant="default"
          className="w-full  h-160 block overflow-x-auto overflow-y-hidden dark:scrollbar-track-primary scrollbar-thin dark:scrollbar-thumb-borderPrimary
          scrollbar-thumb-slate-200
          scrollbar-thumb-rounded-3xl
          scrollbar-track-rounded-full scrollbar-track"
        >
          <UsersList searchOption={false} />
        </Container>
      </Container>
    </Main>
  );
};

export default DashBoardPage;
