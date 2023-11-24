import { useState } from "react";
import Main from "../components/Common/Main";
import Button from "../components/UI/Button";
import Container from "../components/UI/Container";
import Heading from "../components/UI/Heading";
import Modal from "../components/transitions/Modal";
import UsersList from "../components/transitions/Users/UsersList";
import { DUMMY_USERSFULL } from "../components/transitions/dummy-items";
import { AnimatePresence } from "framer-motion";
import FormNewUser from "../components/transitions/Forms/FormNewUser";

const UsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewUserModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      <AnimatePresence>
        {isModalOpen && (
          <Modal
            onClose={() => setIsModalOpen(false)}
            className="sm:w-[50rem]  h-full sm:h-auto overflow-y-auto rounded-none sm:rounded-xl"
            title="Create user"
          >
            <FormNewUser />
          </Modal>
        )}
      </AnimatePresence>
      <Main>
        <Container as="div" variant="wrapper" className="p-5 lg:px-14">
          <Container as="section" variant="flex" className="justify-start py-20 px-5  pb-10">
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
            className="p-0 md:p-20 w-full h-auto block  overflow-x-auto duration-0 overflow-y-hidden dark:scrollbar-track-primary scrollbar-thin dark:scrollbar-thumb-borderPrimary
        scrollbar-thumb-slate-200
        scrollbar-thumb-rounded-3xl
        scrollbar-track-rounded-full scrollbar-track"
          >
            <UsersList
              users={DUMMY_USERSFULL}
              searchOption={true}
              className=" dark:bg-primary rounded-xl duration-0 h-auto min-h-screen "
            />
          </Container>
        </Container>
      </Main>
    </>
  );
};

export default UsersPage;
