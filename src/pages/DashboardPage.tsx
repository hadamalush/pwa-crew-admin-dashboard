import Main from "../components/Common/Main";
import Button from "../components/UI/Button";
import Container from "../components/UI/Container";
import { IconNameType } from "../components/UI/Icons/IconBase";
import Advertisement from "../components/transitions/Advertisement";
import CardStats from "../components/transitions/Cards/CardStats";
import CardStorage from "../components/transitions/Cards/CardStorage";
import CardUsersStats from "../components/transitions/Cards/CardUsersStat";
import UsersList from "../components/transitions/Users/UsersList";

import { useGlobalDispatch, useGlobalSelector } from "../global/hooks";
import { setUsersStats } from "../global/stats-slice";
import useAxiosPrivate from "../hooks/usePrivateAxios";
import { fetchPageViews, fetchStatsMongo, fetchUsers } from "../util/actions/actions";

type DUMMY_INFOTYPE = {
  id: string;
  title: string;
  quantity: number | undefined | null;
  percentages: number;
  iconName: IconNameType;
  fetch?: () => Promise<string>;
};

const DashBoardPage = () => {
  const stateStats = useGlobalSelector((state) => state.stats);

  const dispatch = useGlobalDispatch();
  const axiosPrivate = useAxiosPrivate();

  const DUMMY_INFO: DUMMY_INFOTYPE[] = [
    {
      id: "e1",
      title: "Page views",
      iconName: "eyeUp",
      quantity: stateStats.pagesViews.views,
      percentages: stateStats.pagesViews.percentages,
      fetch: async () => fetchPageViews(axiosPrivate, dispatch),
    },
    {
      id: "e2",
      title: "Base connections",
      iconName: "cloudConnections",
      quantity: stateStats.mongoConns.current,
      percentages: stateStats.mongoConns.percentages,
      fetch: async () => fetchStatsMongo(axiosPrivate, dispatch),
    },
    { id: "e3", title: "Number of errors ", iconName: "warning", quantity: 2, percentages: -2.33 },
    {
      id: "e4",
      title: "Number of users",
      iconName: "usersPlus",
      quantity: stateStats.users.numberUsers,
      percentages: stateStats.users.percentages,
      fetch: async () => {
        const users = await fetchUsers(axiosPrivate, dispatch);
        dispatch(setUsersStats({ users: users.users }));
        return users.mess;
      },
    },
  ];

  const fetchdata = async () => {
    const response = await axiosPrivate("/admin/stats/cloudinary");

    console.log(response);
  };

  return (
    <Main>
      <Container as="div" variant="wrapper">
        <Advertisement />
        <Container
          as="section"
          variant="grid"
          className="grid-cols-1 gap-5 sm:grid-cols-2 xlg:grid-cols-4"
        >
          <Button onClick={fetchdata}>sadasd</Button>
          {DUMMY_INFO.map((item) => {
            return <CardStats key={item.id} {...item} />;
          })}
        </Container>
        <Container as="section" variant="flex" className="flex-col gap-10 md:flex-row">
          <CardStorage dataStorage={stateStats.storage} className="md:w-2/6" />
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
