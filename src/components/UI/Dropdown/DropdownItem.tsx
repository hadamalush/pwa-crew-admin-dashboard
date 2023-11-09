import Icon from "../Icons/Icon";
import Avatar from "../../transitions/Avatar";
import { IconNameType } from "../Icons/IconBase";
import Heading from "../Heading";
import { NavLink } from "react-router-dom";
import { cn } from "../../../util/utils";
import { basicVariantColorType } from "../../variants/variants";

export type DropdownItemProps = {
  iconName?: IconNameType | undefined;
  avatarSrc?: string | undefined;
  title: string;
  description?: string;
  id: string;
};

const DropdownItem = ({ iconName, avatarSrc, title, description }: DropdownItemProps) => {
  let img;
  const iconColor = cn({
    ["blue"]: iconName === "users" || iconName === "settings",
    ["green"]: iconName === "mail",
    ["yellow"]: iconName === "bell",
    ["red"]: iconName === "power",
  }) as basicVariantColorType;

  const c = {
    text: "overflow-hidden whitespace-nowrap text-ellipsis",
    heading: "overflow-hidden whitespace-nowrap text-ellipsis text-white",
    link: "flex items-center p-4 border-t border-borderPrimary hover:bg-navItemActive outline-none",
    circle: "bg-primaryLight w-20 h-16 ml-3 p-3 rounded-full flexCenter",
  };

  if (iconName) {
    img = (
      <span className={c.circle}>
        <Icon color={iconColor} size="s1_5" iconName={iconName} />
      </span>
    );
  }
  if (avatarSrc) img = <Avatar size="s5" src={avatarSrc} className="ml-3" />;

  return (
    <li>
      <NavLink to="/" className={c.link}>
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
