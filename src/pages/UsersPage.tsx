import { useEffect, useState } from "react";
import Main from "../components/Common/Main";
import Button from "../components/UI/Button";
import Container from "../components/UI/Container";
import Heading from "../components/UI/Heading";
import Modal from "../components/transitions/Modal";
import UsersList from "../components/transitions/Users/UsersList";
import { AnimatePresence } from "framer-motion";
import FormNewUser from "../components/transitions/Forms/FormNewUser";
import { AxiosInstance } from "axios";
import { AppDispatch } from "../global/store";
import { StatsState, setUsersStats } from "../global/stats-slice";
import { fetchUsers } from "../util/actions/actions";
import useAxiosPrivate from "../hooks/usePrivateAxios";
import { useGlobalDispatch, useGlobalSelector } from "../global/hooks";

const UsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useGlobalDispatch();
  const stateStats = useGlobalSelector((state) => state.stats);

  const handleNewUserModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  useEffect(() => {
    fetchDataInBackground(axiosPrivate, dispatch, stateStats);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [axiosPrivate, dispatch]);

  return (
    <>
      <AnimatePresence>
        {isModalOpen && (
          <Modal
            onClose={() => setIsModalOpen(false)}
            className="sm:w-[50rem]  h-full sm:h-auto overflow-y-auto rounded-none sm:rounded-xl"
            title="Create user"
          >
            <FormNewUser onClose={() => setIsModalOpen(false)} />
          </Modal>
        )}
      </AnimatePresence>
      <Main>
        <Container as="div" variant="wrapper" className=" lg:px-14 p-0 md:p-10 ">
          <Container as="section" variant="flex" className="justify-start py-20 px-5  pb-10 ">
            <Heading as="h1" className="text-3xl md:text-5xl dark:text-textPrimary text-black">
              Users list
            </Heading>
            <Button
              variant="default"
              className="ml-auto px-4 md:text-2xl font-semibold"
              size="big"
              onClick={handleNewUserModal}
            >
              New user
            </Button>
          </Container>
          <Container
            variant="default"
            as="section"
            className="p-0 md:p-20 w-full h-auto block  overflow-x-auto duration-200 overflow-y-hidden dark:scrollbar-track-primary scrollbar-thin dark:scrollbar-thumb-borderPrimary
            rounded-none
            md:rounded-xl
        scrollbar-thumb-slate-200
        scrollbar-thumb-rounded-3xl
        scrollbar-track-rounded-full scrollbar-track"
          >
            <UsersList searchOption={true} className=" rounded-xl h-auto min-h-screen " />
          </Container>
        </Container>
      </Main>
    </>
  );
};

export default UsersPage;

const fetchDataInBackground = async (
  axiosPrivate: AxiosInstance,
  dispatch: AppDispatch,
  statsState: StatsState
) => {
  if (statsState.users.numberUsers === 0) {
    const users = await fetchUsers(axiosPrivate, dispatch);
    dispatch(setUsersStats({ users: users.users }));
  }
};
