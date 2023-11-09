import { NavLink } from "react-router-dom";
import Heading from "../Heading";
import DropdownItem, { DropdownItemProps } from "./DropdownItem";
import { useRef, useEffect, ComponentPropsWithoutRef } from "react";
import { cn } from "../../../util/utils";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";

type infoBottomProps = {
  title: string;
  href: string;
  className?: string;
};

type DropdownListProps = {
  title: string;
  items: DropdownItemProps[];
  isVisible: boolean;
  infoBottom?: infoBottomProps;
  onClose: () => void;
} & ComponentPropsWithoutRef<"ul"> &
  HTMLMotionProps<"ul">;

const DropdownList = ({
  title,
  items,
  isVisible,
  className,
  infoBottom,
  onClose,
  ...props
}: DropdownListProps) => {
  const ref = useRef<HTMLUListElement>(null);

  const c = {
    list: cn(
      "drop-shadow-[0_0px_15px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_0px_15px_rgba(0,0,0,0.9)] dark:shadow-black absolute top-16 dark:bg-primary bg-white rounded-md overflow-hidden cursor-default z-50 w-screen right-0 ss:w-128 flex-shrink-0",
      className
    ),
    heading: "text-left ml-3 p-5 font-bold dark:text-white",
    textInfo:
      "p-6 font-medium dark:hover:bg-navItemActive hover:bg-slate-200 dark:text-white text-xl",
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.ul
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
          exit={{ opacity: 0 }}
          ref={ref}
          className={c.list}
          {...props}
        >
          <Heading as="h3" className={c.heading}>
            {title}
          </Heading>
          {items.map((item) => (
            <DropdownItem key={item.id} {...item} />
          ))}
          {infoBottom && (
            <li>
              <NavLink to={infoBottom.href}>
                <p className={cn(c.textInfo, infoBottom.className)}>{infoBottom.title}</p>
              </NavLink>
            </li>
          )}
        </motion.ul>
      )}
    </AnimatePresence>
  );
};

export default DropdownList;
