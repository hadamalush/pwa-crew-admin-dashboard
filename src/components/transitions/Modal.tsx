import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { type HTMLMotionProps } from "framer-motion";

type ModalProps = {
  onClose: () => void;
  children: ReactNode;
} & HTMLMotionProps<"dialog">;

const Modal = ({ onClose, ...props }: ModalProps) => {
  return createPortal(
    <>
      <div
        onClick={onClose}
        className="absolute z-[999] w-screen h-screen bg-[rgba(0,0,0,0.8)] from-transparent"
      ></div>
      <motion.dialog
        initial={{ y: "-200%", x: "-50%", opacity: 0 }}
        animate={{ y: "-50%", opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-96 h-96 absolute z-[1000] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
        {...props}
        open
      >
        {props.children}
      </motion.dialog>
    </>,
    document.getElementById("modal")!
  );
};

export default Modal;
