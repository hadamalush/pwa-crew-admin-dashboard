import { NavLink } from "react-router-dom";
import Heading from "../Heading";
import DropdownItem, { DropdownItemProps } from "./DropdownItem";
import { useRef, useEffect } from "react";

type DropdownListProps = {
  title: string;
  items: DropdownItemProps[];
  onClose: () => void;
};

const DropdownList = ({ title, items, onClose }: DropdownListProps) => {
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
  });

  return (
    <ul
      ref={ref}
      className="max-w-md shadow-2xl shadow-black absolute top-24  bg-primary rounded-md overflow-hidden cursor-default"
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
    </ul>
  );
};

export default DropdownList;
