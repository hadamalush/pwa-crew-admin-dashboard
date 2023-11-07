import { type FC } from "react";
import { type IconNameType } from "../../UI/Icons/IconBase";
import { NavLink } from "react-router-dom";
import Icon from "../../UI/Icons/Icon";
import { cn } from "../../../util/utils";

type NavItemProps = {
  icon: IconNameType;
  to: string;
  children: string;
  className?: string;
};

const NavItem: FC<NavItemProps> = ({ icon, to, children, className }) => {
  return (
    <li>
      <NavLink
        className="flex items-center pl-10 py-2 hover:bg-navItemAction w-11/12 rounded-r-full"
        to={to}
      >
        <span className="bg-primaryLight w-14 h-14 mr-4 rounded-full flexCenter">
          <Icon iconName={icon} className={cn("w-6 h-6 text-darkPurple ", className)} />
        </span>

        {children}
      </NavLink>
    </li>
  );
};

export default NavItem;
