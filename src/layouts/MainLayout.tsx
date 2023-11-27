import { Outlet } from "react-router";
import Header from "../components/Common/Header";
// import Navbar from "../components/Common/Navigation/Navbar";
import Footer from "../components/Common/Footer";
// import { MainNavbarItems } from "../components/Common/Navigation/NavigationData";
import { Suspense } from "react";

const MainLayout = () => {
  return (
    <>
      <Header />
      {/* <Navbar data={MainNavbarItems} id="mainNav" /> */}
      <Suspense fallback={<div className="dark:bg-black bg-white w-screen h-screen"></div>}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
};

export default MainLayout;
