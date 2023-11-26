import { useGlobalSelector } from "../../global/hooks";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "../../util/utils";
import { AnimatePresence, motion as m } from "framer-motion";
type MainProps = ComponentPropsWithoutRef<"main">;

const Main = ({ children, className }: MainProps) => {
  const isVisibleNav = useGlobalSelector((state) => state.toggle.isVisibleNav);

  return (
    <AnimatePresence>
      <m.main
        initial={{ opacity: 0, y: "-20%" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          `dark:bg-black bg-white w-full min-h-screen xxl:m-auto md:pl-36  
          w-max-main pt-28   `,
          {
            "md:pl-96": isVisibleNav,
          },
          className
        )}
      >
        {children}
      </m.main>
    </AnimatePresence>
  );
};

export default Main;
