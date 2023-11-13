import { useGlobalSelector } from "../../global/hooks";
import { cn } from "../../util/utils";

const Footer = () => {
  const isVisibleNav = useGlobalSelector((state) => state.toggle.isVisibleNav);

  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer
      className={cn("h-24 pb-10 flexCenter dark:bg-black duration-200 md:pl-36", {
        "md:pl-96": isVisibleNav,
      })}
    >
      <p className="text-center font-bold dark:text-textPrimary">
        Copyright &copy; {year} PWA CREW
      </p>
    </footer>
  );
};

export default Footer;
