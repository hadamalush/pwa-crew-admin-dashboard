import { cn } from "../../../util/utils";
import { basicVariant } from "../../variants/variants";
import { ComponentPropsWithoutRef, useEffect, useRef } from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";

type SimpleDropdownListProps = {
  isVisible: boolean;
  onClose: () => void;
} & ComponentPropsWithoutRef<"ul"> &
  HTMLMotionProps<"ul">;

const SimpleDropdownList = ({ onClose, isVisible, ...props }: SimpleDropdownListProps) => {
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
          className={cn(
            basicVariant({ box: "littleShadow" }),
            "absolute bottom-[-8rem] left-5 w-40 rounded-lg z-10 dark:bg-primary h-auto overflow-hidden text-black dark:text-textPrimary "
          )}
          ref={ref}
        >
          {props.children}
        </motion.ul>
      )}
    </AnimatePresence>
  );
};

export default SimpleDropdownList;
