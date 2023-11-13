import { NavLink, Outlet } from "react-router-dom";
import Main from "../components/Common/Main";

const InboxLayout = () => {
  return (
    <Main>
      <nav>
        <ul className="flex gap-3 m-10 justify-center">
          <li>
            <NavLink
              to="/received"
              className="w-40 md:w-96 bg-lightBlue hover:bg-darkBlue duration-200 py-4 text-center rounded-md block text-white font-semiBold"
            >
              Received
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/received"
              className="w-40 md:w-96 bg-lightBlue hover:bg-darkBlue duration-200 py-4 text-center rounded-md block text-white font-semiBold"
            >
              Sent
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </Main>
  );
};

export default InboxLayout;
