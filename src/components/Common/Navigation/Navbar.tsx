import { useMediaQuery } from "react-responsive";
import { cn } from "../../../util/utils";
import { useGlobalSelector } from "../../../global/hooks";
import { ComponentPropsWithoutRef } from "react";
import NavItem, { NavItemProps } from "./NavItem";
import Button from "../../UI/Button";
import { lazy, Suspense } from "react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

const TextEditor = lazy(() => import("../../transitions/Editor/TextEditor"));
const Modal = lazy(() => import("../../transitions/Modal"));

type NavbarProps = {
  data: NavItemProps[];
  isAdditionalInfo?: boolean;
} & ComponentPropsWithoutRef<"nav">;

const Navbar = ({ className, data, id, isAdditionalInfo, ...props }: NavbarProps) => {
  const isVisibleNav = useGlobalSelector((state) => state.toggle.isVisibleNav);
  const isMdScreen = useMediaQuery({ minWidth: 1060 });
  const [isOpenEditor, setIsOpenEditor] = useState(false);

  const isInboxNav = id === "inboxNav";

  const handleNewMessage = () => {
    setIsOpenEditor(true);
  };
  const handleNewMessageclose = () => {
    setIsOpenEditor(false);
  };

  return (
    <>
      <AnimatePresence>
        {isOpenEditor && (
          <Suspense fallback={<div>Loading...</div>}>
            <Modal onClose={handleNewMessageclose} className="sm:w-[70rem] md:w-[80rem]">
              <TextEditor />
            </Modal>
          </Suspense>
        )}
      </AnimatePresence>

      <nav
        id={id}
        className={cn(
          `drop-shadow-[0_0px_15px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_0px_15px_rgba(0,0,0,0.2)]  dark:bg-primary md:w-36 duration-200 top-28 md:left-0 fixed z-50 bg-white right-0 w-screen xs:w-96 h-3/4 md:h-screen translate-x-full
         md:translate-x-0 shadow-black xs:rounded-bl-xl md:shadow-none border-r border-pLight dark:border-none`,
          {
            "md:w-96": isVisibleNav && id === "mainNav",
          },
          {
            "translate-x-0": isVisibleNav && !isMdScreen && id === "mainNav",
          },
          className
        )}
        {...props}
      >
        {(isVisibleNav || !isMdScreen) && !isInboxNav && (
          <h3 className="pl-10 mb-5 font-bold pt-5 dark:text-textPrimary">Navigation</h3>
        )}

        {isInboxNav && (
          <Button
            variant="default"
            className="py-2 w-10/12 mx-auto mb-5"
            onClick={handleNewMessage}
          >
            New message
          </Button>
        )}

        <ul>
          {data.map((item) => (
            <NavItem
              key={item.id}
              isAdditionalInfo={isAdditionalInfo}
              {...item}
              title={isVisibleNav || !isMdScreen || id === "inboxNav" ? item.title : ""}
              aria-label={item.title}
            />
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
