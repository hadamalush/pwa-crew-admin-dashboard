import { Outlet } from "react-router";
import Header from "../components/Common/Header";
import Navbar from "../components/Common/Navigation/Navbar";
import Footer from "../components/Common/Footer";
// import { lazy } from "react";

// const Header = lazy(() => import("../components/Common/Header"));
// const Navbar = lazy(() => import("../components/Common/Navigation/Navbar"));

const MainLayout = () => {
  return (
    <>
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
