import { type FC } from "react";
import { type IconNameType } from "../../UI/Icons/IconBase";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "../../../util/utils";
import Icon, { iconColor } from "../../UI/Icons/Icon";

type NavItemProps = {
  icon: IconNameType;
  to: string;
  children: string;
  className?: string;
  iconColor?: iconColor;
};

const classesNavItem = {
  default:
    "relative flex items-center pl-10 py-2 w-11/12 rounded-r-full hover:bg-navItemActive duration-300 ",
  isActiveClass:
    "bg-navItemActive before:absolute before:left-0 before:inset-y-0 before:w-1 before:bg-lightBlue before:duration-300",
};

const NavItem: FC<NavItemProps> = ({ icon, iconColor, to, children, className }) => {
  const pathname = useLocation().pathname;
  const isActivePath = pathname === to;

  return (
    <li>
      <NavLink
        className={cn([classesNavItem.default], className, {
          [classesNavItem.isActiveClass]: isActivePath,
        })}
        to={to}
      >
        <span className="bg-primaryLight w-14 h-14 mr-4 rounded-full flexCenter">
          <Icon iconName={icon} color={iconColor} size="s1" />
        </span>
        {children}
      </NavLink>
    </li>
  );
};

export default NavItem;
