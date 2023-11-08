import Button from "../UI/Button";
import DropdownList from "../UI/Dropdown/DropdownList";
import Icon from "../UI/Icons/Icon";
import Avatar from "../transitions/Avatar";
import { NavLink } from "react-router-dom";
import { DUMMY_NOTIFICATIONS, DUMMY_MESSAGES, SETTINGS } from "../transitions/dummy-items";
import { useState } from "react";

const Header = () => {
  const [isVisibleNotifications, setIsVisibleNotifications] = useState(false);
  const [isVisibleMessages, setIsVisibleMessages] = useState(false);
  const [isVisibleProfile, setIsVisibleProfile] = useState(false);

  const handleDropdown = (option: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (option === "notifications") {
      setIsVisibleMessages(false);
      setIsVisibleProfile(false);
      setIsVisibleNotifications(true);
    }
    if (option === "messages") {
      setIsVisibleNotifications(false);
      setIsVisibleProfile(false);
      setIsVisibleMessages(true);
    }

    if (option === "profile") {
      setIsVisibleNotifications(false);
      setIsVisibleMessages(false);
      setIsVisibleProfile(true);
    }
  };

  return (
    <header className="bg-primary w-full h-28 flexCenter justify-end">
      <NavLink to="https://pwa-crew-site-demo.vercel.app/" target="_blank" className="group px-5">
        <Icon iconName="home" size="s1_5" className="group-hover:text-lightBlue duration-200" />
      </NavLink>
      <Button
        onClick={(e) => handleDropdown("messages", e)}
        variant="outline"
        className="group px-5 border-l border-borderPrimary"
      >
        <Icon iconName="mail" size="s1_5" className="group-hover:text-lightBlue duration-200" />

        <DropdownList
          title="Notifications"
          items={DUMMY_MESSAGES}
          isVisible={isVisibleMessages}
          onClose={() => setIsVisibleMessages(false)}
        />
      </Button>
      <Button
        onClick={(e) => handleDropdown("notifications", e)}
        variant="outline"
        className="group px-5 border-l border-borderPrimary"
      >
        <Icon iconName="bell" size="s1_5" className="group-hover:text-lightBlue duration-200" />

        <DropdownList
          title="Notifications"
          items={DUMMY_NOTIFICATIONS}
          isVisible={isVisibleNotifications}
          onClose={() => setIsVisibleNotifications(false)}
        />
      </Button>
      <Button
        variant="outline"
        className="group m-10"
        onClick={(e) => handleDropdown("profile", e)}
      >
        <Avatar src="/avatar.jpg" size="s4" />
        <span className="text-white text-2xl font-medium pl-3 group-hover:text-lightBlue duration-200">
          Bolesław Chrobry
        </span>
        <Icon
          iconName="miniArrowDown"
          color="default"
          size="s1"
          className="mt-1 ml-1 w-5 group-hover:text-lightBlue duration-200"
        />

        <DropdownList
          title="Profile"
          items={SETTINGS}
          isVisible={isVisibleProfile}
          onClose={() => setIsVisibleProfile(false)}
        />
      </Button>
    </header>
  );
};

export default Header;
