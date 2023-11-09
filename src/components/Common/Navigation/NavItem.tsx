import { type basicVariantColorType } from "../../variants/variants";
import { type IconNameType } from "../../UI/Icons/IconBase";
import { type ComponentPropsWithoutRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "../../../util/utils";
import Icon from "../../UI/Icons/Icon";

type NavItemProps = {
  icon: IconNameType;
  to: string;
  title?: string;
  className?: string;
  iconColor?: basicVariantColorType;
} & ComponentPropsWithoutRef<"a">;

const classesNavItem = {
  default:
    "relative flex items-center pl-10 py-2 w-11/12 rounded-r-full hover:bg-navItemActive duration-300 outline-none",
  isActiveClass:
    "bg-navItemActive before:absolute before:left-0 before:inset-y-0 before:w-1 before:bg-lightBlue before:duration-300",
};

const NavItem = ({ icon, iconColor, to, title, className, ...props }: NavItemProps) => {
  const pathname = useLocation().pathname;
  const isActivePath = pathname === to;

  return (
    <li>
      <NavLink
        className={cn([classesNavItem.default], className, {
          [classesNavItem.isActiveClass]: isActivePath,
        })}
        to={to}
        {...props}
      >
        <span className="bg-primaryLight w-14 h-14 mr-4 rounded-full flexCenter">
          <Icon iconName={icon} color={iconColor} size="s1" className="w-36 h-8" />
        </span>

        {title && <span className="animate-scale">{title}</span>}
      </NavLink>
    </li>
  );
};

export default NavItem;
