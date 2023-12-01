import { Outlet, useLoaderData } from "react-router";
import Header from "../components/Common/Header";
import Navbar from "../components/Common/Navigation/Navbar";
import Footer from "../components/Common/Footer";
import { MainNavbarItems } from "../components/Common/Navigation/NavigationData";
import { Suspense } from "react";
import CircleLoader from "../components/UI/Loader/CircleLoader";
import { useGlobalSelector } from "../global/hooks";

const MainLayout = () => {
  const isLoading = useGlobalSelector((state) => state.toggle.isLoading);

  const ok = useLoaderData();

  console.log(ok);
  if (!ok) {
    return null;
  }

  console.log("brawo");

  return (
    <>
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
