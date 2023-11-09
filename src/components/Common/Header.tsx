import Button from "../UI/Button";
import DropdownList from "../UI/Dropdown/DropdownList";
import Icon from "../UI/Icons/Icon";
import Avatar from "../transitions/Avatar";
import { NavLink, Form } from "react-router-dom";
import Heading from "../UI/Heading";
import { DUMMY_NOTIFICATIONS, DUMMY_MESSAGES, SETTINGS } from "../transitions/dummy-items";
import { useState, useEffect, type Dispatch, type SetStateAction } from "react";
import { cn } from "../../util/utils";
import { useMediaQuery } from "react-responsive";

type HeaderProps = {
  setIsVisibleNav: Dispatch<SetStateAction<boolean>>;
  isVisibleNav: boolean;
};

const Header = ({ setIsVisibleNav, isVisibleNav }: HeaderProps) => {
  const [isVisibleNotifications, setIsVisibleNotifications] = useState(false);
  const [isVisibleMessages, setIsVisibleMessages] = useState(false);
  const [isVisibleProfile, setIsVisibleProfile] = useState(false);
  const [theme, setTheme] = useState("dark");
  const isMdScreen = useMediaQuery({ minWidth: 1060 });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleDropdown = (option: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (option === "notifications") {
      !isMdScreen && setIsVisibleNav(false);
      setIsVisibleMessages(false);
      setIsVisibleProfile(false);
      setIsVisibleNotifications(true);
    }
    if (option === "messages") {
      !isMdScreen && setIsVisibleNav(false);
      setIsVisibleNotifications(false);
      setIsVisibleProfile(false);
      setIsVisibleMessages(true);
    }

    if (option === "profile") {
      !isMdScreen && setIsVisibleNav(false);
      setIsVisibleNotifications(false);
      setIsVisibleMessages(false);
      setIsVisibleProfile(true);
    }
  };

  const handleNav = () => {
    setIsVisibleNav((prevState) => !prevState);
  };

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="dark:bg-primary bg-white border-b border-pLight dark:border-none w-full h-28 flexCenter justify-end  drop-shadow-[0_0px_15px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_0px_15px_rgba(0,0,0,0.3)]">
      <Heading
        as="h1"
        className={cn(
          "w-96 pl-10 text-4xl dark:text-white text-black tracking-widest uppercase flex-shrink-0 duration-200 hidden md:inline-block",
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
        aria-label="navigation menu"
        type="button"
      >
        <Icon
          iconName="menu"
          size="s1"
          className="group-hover:text-lightBlue text-textPrimary duration-200 "
        />
      </Button>

      <Form className=" m-auto w-5/12 hidden md:flex">
        <input
          className="w-full px-7 py-3 placeholder:text-textPrimary rounded-md border border-pLight dark:border-borderPrimary dark:bg-primary outline-none"
          placeholder="Search users"
        />
      </Form>

      <Button
        variant="outline"
        className="group px-5 hidden md:inline-flex"
        aria-label="theme switcher"
        type="button"
        onClick={handleThemeSwitch}
      >
        <Icon
          iconName="sun"
          size="s1_5"
          className="group-hover:text-lightBlue duration-200 text-gray dark:text-white"
        />
      </Button>
      <NavLink
        to="https://pwa-crew-site-demo.vercel.app/"
        target="_blank"
        className="group px-5 border-l border-pLight dark:border-borderPrimaryhidden md:inline outline-none "
        aria-label="Main website - pwacrew"
      >
        <Icon
          iconName="home"
          size="s1_5"
          className="group-hover:text-lightBlue duration-200 text-gray dark:text-white"
        />
      </NavLink>
      <Button
        onClick={(e) => handleDropdown("messages", e)}
        variant="outline"
        className="group px-5 border-l border-pLight dark:border-borderPrimary ss:relative"
        aria-label="messages"
        type="button"
      >
        <Icon
          iconName="mail"
          size="s1_5"
          className="group-hover:text-lightBlue duration-200 text-gray dark:text-white"
        />

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
        className="group px-5 border-l border-pLight dark:border-borderPrimary ss:relative"
        aria-label="notifications"
        type="button"
      >
        <Icon
          iconName="bell"
          size="s1_5"
          className="group-hover:text-lightBlue duration-200 text-gray dark:text-white"
        />

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
        aria-label="profil"
        type="button"
      >
        <Avatar src="/avatar.jpg" size="s4" />
        <span className="dark:text-white text-2xl font-medium pl-3 group-hover:text-lightBlue duration-200 w-32 overflow-hidden whitespace-nowrap text-ellipsis hidden md:inline">
          Bolesław Chrobry
        </span>
        <Icon
          iconName="miniArrowDown"
          color="default"
          size="s1"
          className="mt-1 ml-1 w-5 group-hover:text-lightBlue duration-200 hidden md:inline-block dark:text-white text-black"
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
