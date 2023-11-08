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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          ref={ref}
          className={cn(
            "max-w-md shadow-2xl shadow-black absolute top-24  bg-primary rounded-md overflow-hidden cursor-default delay-1000 duration-300 z-50",
            className
          )}
          {...props}
        >
          <Heading as="h3" className="text-left ml-3 p-5 font-bold text-white">
            {title}
          </Heading>
          {items.map((item) => (
            <DropdownItem key={item.id} {...item} />
          ))}
          <li>
            <NavLink to="/">
              <p className="p-6 font-medium hover:bg-navItemActive text-white text-xl">
                5 new notifications
              </p>
            </NavLink>
          </li>
        </motion.ul>
      )}
    </AnimatePresence>
  );
};

export default DropdownList;
