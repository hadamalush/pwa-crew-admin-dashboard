import Icon from "../Icons/Icon";
import Avatar from "../../transitions/Avatar";
import { IconNameType } from "../Icons/IconBase";
import Heading from "../Heading";
import { NavLink } from "react-router-dom";
import { cn } from "../../../util/utils";
import { basicVariantColorType } from "../../variants/variants";
import useLogout from "../../../hooks/useLogout";

export type DropdownItemProps = {
  iconName?: IconNameType | undefined;
  avatarSrc?: string | undefined;
  title: string;
  description?: string;
  id: string;
  action?: "logout";
};

const DropdownItem = ({ iconName, avatarSrc, title, description, action }: DropdownItemProps) => {
  const logout = useLogout();

  let img;
  const iconColor = cn({
    ["blue"]: iconName === "users" || iconName === "settings",
    ["green"]: iconName === "mail",
    ["yellow"]: iconName === "bell",
    ["red"]: iconName === "power",
  }) as basicVariantColorType;

  const c = {
    text: "overflow-hidden whitespace-nowrap text-ellipsis dark:text-textPrimary text-gray",
    heading: "overflow-hidden whitespace-nowrap text-ellipsis dark:text-white",
    link: "flex items-center p-4 border-t border-pLight dark:border-borderPrimary dark:hover:bg-navItemActive hover:bg-slate-200 outline-none",
    circle: "bg-slate-100 dark:bg-primaryLight w-20 h-16 ml-3 p-3 rounded-full flexCenter",
  };

  if (iconName) {
    img = (
      <span className={c.circle}>
        <Icon color={iconColor} size="s1_5" iconName={iconName} />
      </span>
    );
  }
  if (avatarSrc) img = <Avatar size="s5" src={avatarSrc} className="ml-3" />;

  const handleAction = async () => {
    if (action === "logout") {
      console.log("ruszlo");
      await logout();
    }
  };

  return (
    <li>
      <NavLink to="/" className={c.link} onClick={handleAction}>
        {img}
        <div className="w-10/12 px-10 mr-2">
          <Heading as="h5" className={c.heading}>
            {title}
          </Heading>
          {description && <p className={c.text}>{description}</p>}
        </div>
      </NavLink>
    </li>
  );
};

export default DropdownItem;
