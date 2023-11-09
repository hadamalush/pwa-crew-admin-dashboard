import { useMediaQuery } from "react-responsive";
import { cn } from "../../../util/utils";
import NavItem from "./NavItem";

type NavbarProps = {
  isVisibleNav: boolean;
};

const Navbar = ({ isVisibleNav }: NavbarProps) => {
  const isMdScreen = useMediaQuery({ minWidth: 1060 });

  console.log(isVisibleNav && isMdScreen);

  return (
    <nav
      className={cn(
        ` dark:bg-primary md:w-96 duration-200 md:left-0 absolute right-0 w-screen xs:w-96 h-3/4 md:h-screen translate-x-full
         md:translate-x-0 shadow-2xl shadow-black xs:rounded-bl-xl md:shadow-none border-r border-primaryBorderLight dark:border-none`,
        {
          "md:w-36": !isVisibleNav,
        },
        {
          "translate-x-0": isVisibleNav && !isMdScreen,
        }
      )}
    >
      {(isVisibleNav || !isMdScreen) && <h3 className="pl-10 mb-5 font-bold pt-5">Navigation</h3>}
      <ul>
        <NavItem
          to="/"
          icon="dashboard"
          iconColor="purple"
          title={isVisibleNav || !isMdScreen ? "Dashboard" : ""}
          aria-label="dashboard"
        />
        <NavItem
          to="/inbox"
          icon="mail"
          iconColor="blue"
          title={isVisibleNav || !isMdScreen ? "Inbox" : ""}
          aria-label="inbox"
        />
        <NavItem
          to="/users"
          icon="users"
          iconColor="green"
          title={isVisibleNav || !isMdScreen ? "Users" : ""}
          aria-label="users"
        />
        <NavItem
          to="/events"
          icon="calendarPlus"
          iconColor="yellow"
          title={isVisibleNav || !isMdScreen ? "Events" : ""}
          aria-label="events"
        />
        <NavItem
          to="/settings"
          icon="settings"
          iconColor="blue"
          title={isVisibleNav || !isMdScreen ? "Settings" : ""}
          aria-label="settings"
        />
        <NavItem
          to="/test"
          icon="power"
          iconColor="red"
          title={isVisibleNav || !isMdScreen ? "Sign out" : ""}
          aria-label="sign out"
        />
      </ul>
    </nav>
  );
};

export default Navbar;
