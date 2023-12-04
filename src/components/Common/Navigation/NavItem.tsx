import { type basicVariantColorType } from "../../variants/variants";
import { type IconNameType } from "../../UI/Icons/IconBase";
import { type ComponentPropsWithoutRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "../../../util/utils";
import Icon from "../../UI/Icons/Icon";
import { useGlobalSelector } from "../../../global/hooks";
import { messageDetailsType } from "../../../global/message-slice";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { handleInboxNav, handleNav } from "../../../global/toggle-slice";
import { useMediaQuery } from "react-responsive";
import useLogout from "../../../hooks/useLogout";

type handleAdditionalInfoProps = {
  pageName: "Trash" | "Inbox" | "Featured" | "Spam" | null;
  allMessages: messageDetailsType[];
};

export type NavItemProps = {
  icon: IconNameType;
  to: string;
  title?: string;
  className?: string;
  iconColor?: basicVariantColorType;
  isAdditionalInfo?: boolean;
  action?: "logout";
} & ComponentPropsWithoutRef<"a">;

const classesNavItem = {
  default:
    "relative flex items-center pl-10 py-2 w-11/12 rounded-r-full dark:hover:bg-navItemActive hover:bg-slate-200 hover:text-lightBlue duration-300 outline-none dark:text-textPrimary",
  isActiveClass:
    "dark:bg-navItemActive bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:w-1 before:bg-lightBlue before:duration-300",
};

const NavItem = ({
  icon,
  iconColor,
  to,
  title,
  className,
  isAdditionalInfo,
  action,
  ...props
}: NavItemProps) => {
  const allMessages = useGlobalSelector((state) => state.messages.allMessages);
  const pathname = useLocation().pathname;
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const logout = useLogout();

  const isActivePath = pathname === to;
  const isMediumScreen = useMediaQuery({ minWidth: 1060 });
  const formattedTitle =
    title === "Trash" || title === "Spam" || title === "Featured" || title === "Inbox"
      ? title
      : null;

  useEffect(() => {
    if (isAdditionalInfo) {
      const messQuantity = getUnreadMessageCountByTab({ pageName: formattedTitle, allMessages });
      setQuantity(messQuantity);
    }
  }, [quantity, allMessages, formattedTitle, isAdditionalInfo]);

  const closeNavHandler = () => {
    if (!isMediumScreen) {
      dispatch(handleInboxNav({ isVisibleInboxNav: false }));
      dispatch(handleNav({ isVisibleNav: false }));
    }

    if (action === "logout") {
      logout();
    }
  };

  return (
    <li>
      <NavLink
        className={cn([classesNavItem.default], className, {
          [classesNavItem.isActiveClass]: isActivePath,
        })}
        to={to}
        {...props}
        onClick={closeNavHandler}
      >
        <span className="dark:bg-primaryLight  w-14 h-14 mr-4 rounded-full flexCenter">
          <Icon iconName={icon} color={iconColor} size="s1" className="w-36 h-8" />
        </span>

        <AnimatePresence>
          {isAdditionalInfo && quantity > 0 && (
            <motion.span
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
              exit={{ y: 20, opacity: 0 }}
              className="dark:bg-primaryLight  w-10 h-10 mr-4 rounded-full flexCenter absolute right-0"
            >
              {quantity}
            </motion.span>
          )}
        </AnimatePresence>

        {title && <span className="animate-scale">{title}</span>}
      </NavLink>
    </li>
  );
};

export default NavItem;

const getUnreadMessageCountByTab = ({ pageName, allMessages }: handleAdditionalInfoProps) => {
  let quantity: number = 0;

  if (pageName === "Trash") {
    quantity = allMessages.filter((mess) => mess.isInTrash && !mess.unRead).length;
  }
  if (pageName === "Inbox") {
    quantity = allMessages.filter(
      (mess) => !mess.isInSpam && !mess.isInTrash && !mess.unRead
    ).length;
  }
  if (pageName === "Featured") {
    quantity = allMessages.filter((mess) => mess.isFeatured && !mess.unRead).length;
  }
  if (pageName === "Spam") {
    quantity = allMessages.filter((mess) => mess.isInSpam && !mess.unRead).length;
  }

  return quantity;
};
