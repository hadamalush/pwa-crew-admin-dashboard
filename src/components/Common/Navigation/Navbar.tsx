import { cn } from "../../../util/utils";
import NavItem from "./NavItem";

type NavbarProps = {
  statusNav: boolean;
};

const Navbar = ({ statusNav }: NavbarProps) => {
  return (
    <nav className={cn("h-screen bg-primary w-96 duration-200", { "w-36": !statusNav })}>
      {statusNav && <h3 className="pl-10 mb-5 font-bold">Navigation</h3>}
      <ul>
        <NavItem to="/" icon="dashboard" iconColor="purple" title={statusNav ? "Dashboard" : ""} />
        <NavItem to="/inbox" icon="mail" iconColor="blue" title={statusNav ? "Inbox" : ""} />
        <NavItem to="/users" icon="users" iconColor="green" title={statusNav ? "Users" : ""} />
        <NavItem
          to="/events"
          icon="calendarPlus"
          iconColor="yellow"
          title={statusNav ? "Events" : ""}
        />
        <NavItem
          to="/settings"
          icon="settings"
          iconColor="blue"
          title={statusNav ? "Settings" : ""}
        />
        <NavItem to="/test" icon="power" iconColor="red" title={statusNav ? "Sign out" : ""} />
      </ul>
    </nav>
  );
};

export default Navbar;
