import NavItem from "./NavItem";
// import Button from "../../UI/Button";

const Navbar = () => {
  return (
    <nav className="h-screen bg-primary w-96">
      <ul>
        <NavItem to="/" icon="dashboard">
          Dashboard
        </NavItem>
        <NavItem to="/" icon="mail" className="text-orangeYellow">
          Inbox
        </NavItem>
        <NavItem to="/" icon="users" className="text-lightGreen">
          Users
        </NavItem>
        <NavItem to="/" icon="calendarPlus" className="text-lightBlue">
          Events
        </NavItem>
        <NavItem to="/" icon="settings" className="text-orangeYellow">
          Settings
        </NavItem>
        <NavItem to="/" icon="power" className="text-lightRed">
          Sign out
        </NavItem>
      </ul>
    </nav>
  );
};

export default Navbar;
