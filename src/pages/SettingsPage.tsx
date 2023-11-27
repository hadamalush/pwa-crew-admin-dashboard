import { Suspense, useState, lazy } from "react";
import Main from "../components/Common/Main";
import Container from "../components/UI/Container";
import Heading from "../components/UI/Heading";
import CardSettingsOption from "../components/transitions/Cards/CardSettingsOption";
import { AnimatePresence } from "framer-motion";
import SettingsTool from "../components/transitions/Settings/SettingsDatabase";

const TextEditor = lazy(() => import("../components/transitions/Editor/TextEditor"));
const SelectSingle = lazy(() => import("../components/UI/Select/SelectSingle"));
const Modal = lazy(() => import("../components/transitions/Modal"));

type OptionType = { label: string; value: string };
const optionsSelect: OptionType[] = [
  { value: "cloudinary", label: "Cloudinary" },
  { value: "vercelblob", label: "VercelBlob" },
  { value: "mega", label: "Mega" },
];

type ModalStateType = {
  mode: "database" | "message" | "info" | "none";
};

const SettingsPage = () => {
  const [isOpenModal, setIsOpenModal] = useState<ModalStateType>({ mode: "none" });

  const modalTitle =
    (isOpenModal.mode === "database" && "Chaning database") || isOpenModal.mode === "info"
      ? "Additional inoformation settings"
      : "Automatic message settings";

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
                <SettingsTool
                  title="Select and approve the drive your application will use, the drive on the page should change within 30 minutes."
                  className="pb-20"
                  btnClass="w-9/12"
                >
                  <SelectSingle options={optionsSelect} />
                </SettingsTool>
              )}
              {isOpenModal.mode === "message" && (
                <SettingsTool
                  title="Set up an automatic message, which will be sent to users, if they use the contact form"
                  className="px-10"
                >
                  <TextEditor className="!p-0 mb-2" />
                </SettingsTool>
              )}
              {isOpenModal.mode === "info" && (
                <SettingsTool
                  title="Set startup information, which will appear on the homepage. Information after approval should show up to 30minutes."
                  className="px-10"
                >
                  <TextEditor className="!p-0 mb-2" />
                </SettingsTool>
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
