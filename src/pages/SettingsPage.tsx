import { Suspense, useState, lazy } from "react";
import Main from "../components/Common/Main";
import Container from "../components/UI/Container";
import Heading from "../components/UI/Heading";
import CardSettingsOption from "../components/transitions/Cards/CardSettingsOption";
import { AnimatePresence } from "framer-motion";

const AdditionalInfo = lazy(() => import("../components/transitions/Settings/AdditionalInfo"));
const AutomaticMessage = lazy(() => import("../components/transitions/Settings/AutomaticMessage"));
const SettingsStorage = lazy(() => import("../components/transitions/Settings/SettingsStorage"));
const Modal = lazy(() => import("../components/transitions/Modal"));

type ModalStateType = {
  mode: "database" | "message" | "info" | "none";
};

const SettingsPage = () => {
  const [isOpenModal, setIsOpenModal] = useState<ModalStateType>({ mode: "none" });

  console.log(isOpenModal);

  const modalTitle =
    (isOpenModal.mode === "database" && "Chaning database") ||
    (isOpenModal.mode === "info"
      ? "Additional inoformation settings"
      : "Automatic message settings");

  return (
    <>
      <AnimatePresence>
        {["database", "message", "info"].includes(isOpenModal.mode) && (
          <Suspense fallback={<div className="absolute ">Loading...</div>}>
            <Modal
              onClose={() => setIsOpenModal({ mode: "none" })}
              className="sm:w-[70rem] md:w-[80rem] h-full sm:h-auto overflow-y-auto rounded-none sm:rounded-xl"
              title={modalTitle}
            >
              {isOpenModal.mode === "database" && (
                <SettingsStorage
                  onClose={() => {
                    setIsOpenModal({ mode: "none" });
                    document.body.classList.remove("bodyhidden");
                  }}
                />
              )}
              {isOpenModal.mode === "message" && (
                <AutomaticMessage
                  onClose={() => {
                    setIsOpenModal({ mode: "none" });
                    document.body.classList.remove("bodyhidden");
                  }}
                />
              )}
              {isOpenModal.mode === "info" && (
                <AdditionalInfo
                  onClose={() => {
                    setIsOpenModal({ mode: "none" });
                    document.body.classList.remove("bodyhidden");
                  }}
                />
              )}
            </Modal>
          </Suspense>
        )}
      </AnimatePresence>
      <Main className="flex items-center justify-center relative">
        <Heading
          as="h2"
          className="absolute top-[12rem] text-4xl font-bold dark:text-white text-black md:top-[20rem] md:text-5xl"
        >
          Application settings
        </Heading>
        <Container
          variant="wrapper"
          as="section"
          className="sm:flex-row flex-wrap sm:justify-center gap-5 max-w-[150rem] mt-36"
        >
          <CardSettingsOption
            iconName="database"
            iconColor="red"
            title="Database"
            text="Change database on your page"
            onClick={() => setIsOpenModal({ mode: "database" })}
          />
          <CardSettingsOption
            iconName="messageSettings"
            iconColor="yellow"
            title="Automatic message"
            text="Set automatic message on your page"
            onClick={() => setIsOpenModal({ mode: "message" })}
          />
          <CardSettingsOption
            iconName="infoBox"
            iconColor="blue"
            title="Additional information"
            text="Set user information on the home page"
            onClick={() => setIsOpenModal({ mode: "info" })}
          />
        </Container>
      </Main>
    </>
  );
};

export default SettingsPage;
