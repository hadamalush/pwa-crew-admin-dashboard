import { Outlet } from "react-router";
import Header from "../components/Common/Header";
import Navbar from "../components/Common/Navigation/Navbar";
import Footer from "../components/Common/Footer";
import { MainNavbarItems } from "../components/Common/Navigation/NavigationData";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Navbar data={MainNavbarItems} id="mainNav" />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
