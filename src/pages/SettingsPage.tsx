import { Suspense, useState } from "react";
import Main from "../components/Common/Main";
import Container from "../components/UI/Container";
import Heading from "../components/UI/Heading";
import CardSettingsOption from "../components/transitions/Cards/CardSettingsOption";
import { AnimatePresence } from "framer-motion";
import Modal from "../components/transitions/Modal";
import SettingsTool from "../components/transitions/Settings/SettingsDatabase";
import SelectSingle from "../components/UI/Select/SelectSingle";

const SettingsPage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  // const handleModalOpen = () => {
  //   console.log("brawoo");
  // };
  return (
    <>
      <AnimatePresence>
        {isOpenModal && (
          <Suspense fallback={<div className="absolute ">Loading...</div>}>
            <Modal
              onClose={() => setIsOpenModal(false)}
              className="sm:w-[70rem] md:w-[80rem] h-full sm:h-auto overflow-y-auto rounded-none sm:rounded-xl"
              title="New message"
            >
              <SettingsTool title="Changing database">
                <SelectSingle />
              </SettingsTool>
            </Modal>
          </Suspense>
        )}
      </AnimatePresence>
      <Main className="flex items-center justify-center relative">
        <Heading
          as="h2"
          className="absolute top-[15rem] text-4xl font-bold dark:text-white text-black md:top-[20rem] md:text-5xl"
        >
          Application settings
        </Heading>
        <Container
          variant="wrapper"
          as="section"
          className="sm:flex-row flex-wrap sm:justify-center gap-5 max-w-[150rem]"
        >
          <CardSettingsOption
            iconName="database"
            iconColor="red"
            title="Database"
            text="Change database on your page"
            onClick={() => setIsOpenModal(true)}
          />
          <CardSettingsOption
            iconName="messageSettings"
            iconColor="yellow"
            title="Automatic message"
            text="Set automatic message on your page"
          />
          <CardSettingsOption
            iconName="infoBox"
            iconColor="blue"
            title="Additional information"
            text="Set user information on the home page"
          />
        </Container>
      </Main>
    </>
  );
};

export default SettingsPage;
