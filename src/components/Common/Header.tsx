import Button from "../UI/Button";
import DropdownList from "../UI/Dropdown/DropdownList";
import Icon from "../UI/Icons/Icon";
import Avatar from "../transitions/Avatar";
import { NavLink, Form } from "react-router-dom";
import Heading from "../UI/Heading";
import { DUMMY_NOTIFICATIONS, DUMMY_MESSAGES, SETTINGS } from "../transitions/dummy-items";
import { useState, type Dispatch, type SetStateAction } from "react";
import { cn } from "../../util/utils";

type HeaderProps = {
  setIsVisibleNav: Dispatch<SetStateAction<boolean>>;
  isVisibleNav: boolean;
};

const Header = ({ setIsVisibleNav, isVisibleNav }: HeaderProps) => {
  const [isVisibleNotifications, setIsVisibleNotifications] = useState(false);
  const [isVisibleMessages, setIsVisibleMessages] = useState(false);
  const [isVisibleProfile, setIsVisibleProfile] = useState(false);

  const handleDropdown = (option: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (option === "notifications") {
      setIsVisibleNav(false);
      setIsVisibleMessages(false);
      setIsVisibleProfile(false);
      setIsVisibleNotifications(true);
    }
    if (option === "messages") {
      setIsVisibleNav(false);
      setIsVisibleNotifications(false);
      setIsVisibleProfile(false);
      setIsVisibleMessages(true);
    }

    if (option === "profile") {
      setIsVisibleNav(false);
      setIsVisibleNotifications(false);
      setIsVisibleMessages(false);
      setIsVisibleProfile(true);
    }
  };

  const handleNav = () => {
    setIsVisibleNav((prevState) => !prevState);
  };

  return (
    <header className="bg-primary w-full h-28 flexCenter justify-end">
      <Heading
        as="h1"
        className={cn(
          "w-96 pl-10 text-4xl text-white tracking-widest uppercase flex-shrink-0 duration-200 hidden md:inline-block",
          {
            "w-36 text-center p-0": !isVisibleNav,
          }
        )}
      >
        P{isVisibleNav && <span className="duration-100  inline-block animate-scale">wa Crew</span>}
      </Heading>

      <Button
        variant="outline"
        className="group px-5 outline-none order-1 md:order-none"
        onClick={handleNav}
      >
        <Icon
          iconName="menu"
          size="s1"
          className="group-hover:text-lightBlue text-textPrimary duration-200 "
        />
      </Button>

      <Form className=" m-auto w-5/12 hidden md:flex">
        <input
          className="w-full px-7 py-3 placeholder:text-textPrimary rounded-md border border-borderPrimary bg-primary outline-none"
          placeholder="Search users"
        />
      </Form>

      <Button variant="outline" className="group px-5 hidden md:inline-flex">
        <Icon iconName="sun" size="s1_5" className="group-hover:text-lightBlue duration-200" />
      </Button>
      <NavLink
        to="https://pwa-crew-site-demo.vercel.app/"
        target="_blank"
        className="group px-5 border-l border-borderPrimary hidden md:inline"
      >
        <Icon iconName="home" size="s1_5" className="group-hover:text-lightBlue duration-200" />
      </NavLink>
      <Button
        onClick={(e) => handleDropdown("messages", e)}
        variant="outline"
        className="group px-5 border-l border-borderPrimary ss:relative"
      >
        <Icon iconName="mail" size="s1_5" className="group-hover:text-lightBlue duration-200" />

        <DropdownList
          title="Notifications"
          items={DUMMY_MESSAGES}
          isVisible={isVisibleMessages}
          onClose={() => setIsVisibleMessages(false)}
          className="top-24 ss:top-16"
          infoBottom={{ href: "/", title: "5 new messages" }}
        />
      </Button>
      <Button
        onClick={(e) => handleDropdown("notifications", e)}
        variant="outline"
        className="group px-5 border-l border-borderPrimary ss:relative"
      >
        <Icon iconName="bell" size="s1_5" className="group-hover:text-lightBlue duration-200" />

        <DropdownList
          title="Notifications"
          items={DUMMY_NOTIFICATIONS}
          isVisible={isVisibleNotifications}
          onClose={() => setIsVisibleNotifications(false)}
          className="top-24 ss:top-16"
          infoBottom={{ href: "/", title: "5 new notifications" }}
        />
      </Button>
      <Button
        variant="outline"
        className="group mr-7 ml-3 "
        onClick={(e) => handleDropdown("profile", e)}
      >
        <Avatar src="/avatar.jpg" size="s4" />
        <span className="text-white text-2xl font-medium pl-3 group-hover:text-lightBlue duration-200 w-32 overflow-hidden whitespace-nowrap text-ellipsis hidden md:inline">
          Bolesław Chrobry
        </span>
        <Icon
          iconName="miniArrowDown"
          color="default"
          size="s1"
          className="mt-1 ml-1 w-5 group-hover:text-lightBlue duration-200 hidden md:inline-block"
        />

        <DropdownList
          title="Profile"
          items={SETTINGS}
          isVisible={isVisibleProfile}
          onClose={() => setIsVisibleProfile(false)}
          className="top-24 ss:w-80"
        />
      </Button>
    </header>
  );
};

export default Header;
