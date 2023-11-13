import { Outlet } from "react-router";
import Header from "../components/Common/Header";
import Navbar from "../components/Common/Navigation/Navbar";
import Footer from "../components/Common/Footer";

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
