import NavItem from "./NavItem";
// import Button from "../../UI/Button";

const Navbar = () => {
  return (
    <nav className="h-screen bg-primary w-96">
      <h3 className="pl-10 mb-5 font-bold">Navigation</h3>
      <ul>
        <NavItem to="/" icon="dashboard" iconColor="purple">
          Dashboard
        </NavItem>
        <NavItem to="/inbox" icon="mail" iconColor="blue">
          Inbox
        </NavItem>
        <NavItem to="/users" icon="users" iconColor="green">
          Users
        </NavItem>
        <NavItem to="/events" icon="calendarPlus" iconColor="yellow">
          Events
        </NavItem>
        <NavItem to="/settings" icon="settings" iconColor="blue">
          Settings
        </NavItem>
        <NavItem to="/test" icon="power" iconColor="red">
          Sign out
        </NavItem>
      </ul>
    </nav>
  );
};

export default Navbar;
