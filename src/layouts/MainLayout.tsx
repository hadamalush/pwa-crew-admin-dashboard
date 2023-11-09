import Header from "../components/Common/Header";
import Navbar from "../components/Common/Navigation/Navbar";
import { useState } from "react";

const MainLayout = () => {
  const [isVisibleNav, setIsVisibleNav] = useState(false);

  return (
    <>
      <Header setIsVisibleNav={setIsVisibleNav} isVisibleNav={isVisibleNav} />
      <Navbar isVisibleNav={isVisibleNav} />
    </>
  );
};

export default MainLayout;
