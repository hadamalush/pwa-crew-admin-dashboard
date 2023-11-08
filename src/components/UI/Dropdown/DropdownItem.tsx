import Icon from "../Icons/Icon";
import Avatar from "../../transitions/Avatar";
import { IconNameType } from "../Icons/IconBase";
import Heading from "../Heading";
import { NavLink } from "react-router-dom";

export type DropdownItemProps = {
  iconName?: IconNameType | undefined;
  avatarSrc: string | undefined;
  title: string;
  description: string;
  id: string;
};

const DropdownItem = ({ iconName, avatarSrc, title, description }: DropdownItemProps) => {
  let img;

  if (iconName) {
    img = <Icon size="s4" iconName={iconName} className="ml-4" />;
  }
  if (avatarSrc) img = <Avatar size="s5" src={avatarSrc} className="ml-2" />;

  return (
    <li>
      <NavLink
        to="/"
        className="flex items-center p-4 border-t border-borderPrimary hover:bg-navItemActive"
      >
        {img}
        <div className="w-10/12 px-10 mr-2">
          <Heading as="h5" className="overflow-hidden whitespace-nowrap text-ellipsis text-white">
            {title}
          </Heading>
          <p className="overflow-hidden whitespace-nowrap text-ellipsis">{description}</p>
        </div>
      </NavLink>
    </li>
  );
};

export default DropdownItem;
