import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { type HTMLMotionProps } from "framer-motion";
import { cn } from "../../util/utils";
import Icon from "../UI/Icons/Icon";
import Button from "../UI/Button";

type ModalProps = {
  onClose: () => void;
  children: ReactNode;
} & HTMLMotionProps<"dialog">;

const Modal = ({ onClose, title, className, ...props }: ModalProps) => {
  return createPortal(
    <>
      <div
        onClick={onClose}
        className="absolute z-[999] w-screen h-full bg-[rgba(0,0,0,0.8)] from-transparent"
      ></div>
      <motion.dialog
        initial={{ y: "-200%", x: "-50%", opacity: 0 }}
        animate={{ y: "-50%", opacity: 1 }}
        exit={{ opacity: 0 }}
        className={cn(
          "w-full absolute z-[1000] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl dark:bg-primary",
          className
        )}
        {...props}
        open
      >
        <div className="h-24 dark:bg-primary p-7 dark:text-white text-3xl font-semibold rounded-tr-xl rounded-tl-xl dark:border-borderPrimary border-pLight border-b flex items-center">
          {title}
          <Button
            className="ml-auto rounded-full p-2 duration-200 dark:hover:bg-primaryLight hover:bg-slate-200"
            onClick={onClose}
          >
            <Icon iconName="cross" className="dark:text-textPrimary text-black" />
          </Button>
        </div>
        {props.children}
      </motion.dialog>
    </>,
    document.getElementById("modal")!
  );
};

export default Modal;
