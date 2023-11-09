import { Outlet } from "react-router";
import Header from "../components/Common/Header";
import Navbar from "../components/Common/Navigation/Navbar";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainLayout;
