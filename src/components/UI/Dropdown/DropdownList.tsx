import { NavLink } from "react-router-dom";
import Heading from "../Heading";
import DropdownItem, { DropdownItemProps } from "./DropdownItem";
import { useRef, useEffect, ComponentPropsWithoutRef } from "react";
import { cn } from "../../../util/utils";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";

type DropdownListProps = {
  title: string;
  items: DropdownItemProps[];
  isVisible: boolean;
  onClose: () => void;
} & ComponentPropsWithoutRef<"ul"> &
  HTMLMotionProps<"ul">;

const DropdownList = ({
  title,
  items,
  onClose,
  isVisible,
  className,
  ...props
}: DropdownListProps) => {
  const ref = useRef<HTMLUListElement>(null);

  const c = {
    list: cn(
      "max-w-md shadow-2xl shadow-black absolute top-24  bg-primary rounded-md overflow-hidden cursor-default z-50",
      className
    ),
    heading: "text-left ml-3 p-5 font-bold text-white",
    textInfo: "p-6 font-medium hover:bg-navItemActive text-white text-xl",
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
          <li>
            <NavLink to="/">
              <p className={c.textInfo}>5 new notifications</p>
            </NavLink>
          </li>
        </motion.ul>
      )}
    </AnimatePresence>
  );
};

export default DropdownList;
