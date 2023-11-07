import { type FC } from "react";
import { NavLink } from "react-router-dom";
import Icon from "../../UI/Icons/Icon";

type NavItemProps = {
  icon: string;
  to: string;
  children: string;
};

const NavItem: FC<NavItemProps> = ({ icon, to, children }) => {
  return (
    <li>
      {icon}
      <Icon iconName="settings" />
      <NavLink to={to}>{children}</NavLink>
    </li>
  );
};

export default NavItem;
