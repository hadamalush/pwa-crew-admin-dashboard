import { Outlet, useLocation } from "react-router";
import Header from "../components/Common/Header";
import Navbar from "../components/Common/Navigation/Navbar";
import Footer from "../components/Common/Footer";
import { MainNavbarItems } from "../components/Common/Navigation/NavigationData";
import { Suspense } from "react";
import CircleLoader from "../components/UI/Loader/CircleLoader";
import { useGlobalSelector } from "../global/hooks";
import DotsLoader from "../components/UI/Loader/DotsLoader";
import { AnimatePresence, motion } from "framer-motion";

const MainLayout = () => {
  const { isTopLoading, isLoading, textTopLoader, pathTopLoader } = useGlobalSelector(
    (state) => state.toggle
  );
  const pathname = useLocation().pathname;

  return (
    <>
      <AnimatePresence>
        {isTopLoading && pathname.includes(pathTopLoader) && (
          <motion.div
            initial={{ y: "-100%", x: "-50%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.3 }}
            exit={{ opacity: 0 }}
            className="fixed top-5 h-20 px-20 flex items-center bg-transparentBlue z-[1000] left-[50%] translate-x-[-50%] rounded-lg text-white"
          >
            {textTopLoader}
            <DotsLoader />
          </motion.div>
        )}
      </AnimatePresence>

      <Header />
      <Navbar data={MainNavbarItems} id="mainNav" />
      <Suspense fallback={<div className="dark:bg-black bg-white w-screen h-screen"></div>}>
        <Outlet />
      </Suspense>
      <Footer />
      {isLoading && (
        <CircleLoader className="!fixed right-10 bottom-10 md:!w-16 md:!h-16 !border-lightBlue" />
      )}
    </>
  );
};

export default MainLayout;
