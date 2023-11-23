import { cn } from "../../../util/utils";
import Button from "../../UI/Button";
import SimpleDropdownList from "../../UI/Dropdown/SimpleDropdownList";
import Icon from "../../UI/Icons/Icon";
import { useState, type MouseEvent } from "react";

import Avatar from "../Avatar";
import { type ComponentPropsWithoutRef } from "react";

export type UserItemProps = {
  name: string;
  avatarSrc?: string;
  email: string;
  accountActive: boolean;
  newsletter: boolean;
  createdAccount: string;
} & ComponentPropsWithoutRef<"ul">;

const UsersItem = ({
  name,
  avatarSrc,
  email,
  accountActive,
  newsletter,
  createdAccount,
  className,
  ...props
}: UserItemProps) => {
  const avatarImg = avatarSrc ? avatarSrc : "/anonymous.webp";
  const [isOpenTools, setIsOpenUserTools] = useState(false);

  const handleUserTools = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setIsOpenUserTools((prev) => !prev);
  };

  return (
    <li>
      <ul
        {...props}
        className={cn(
          "flex w-full mx-auto text-xl xlg:text-2xl justify-between text-black dark:text-textPrimary px-10 border-pLight dark:border-borderPrimary border-b py-11",
          className
        )}
      >
        <li className="w-72 flex items-center">
          <Button
            variant="outline"
            type="button"
            aria-label="Open options"
            className="relative"
            onClick={handleUserTools}
          >
            <Icon
              iconName="dotsVertical"
              className="mr-3 cursor-pointer w-14 dark:text-white text-black "
            />

            <SimpleDropdownList onClose={() => setIsOpenUserTools(false)} isVisible={isOpenTools}>
              <li className="py-4 border-b dark:border-borderPrimary border-pLight dark:hover:bg-primaryLight hover:bg-slate-100 duration-200">
                Edit
              </li>
              <li className="py-4 text-lightRed hover:bg-slate-100 dark:hover:bg-primaryLight duration-200">
                Delete
              </li>
            </SimpleDropdownList>
          </Button>

          <Avatar src={avatarImg} size="s2" />
          <p className="inline p-2 overflow-hidden text-ellipsis whitespace-nowrap max-w-125">
            {name}
          </p>
        </li>
        <li className="w-56 flex items-center pl-5">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">{email}</p>
        </li>
        <li className="w-56 flex items-center justify-center">
          <Icon
            iconName={accountActive ? "check" : "cross"}
            color={accountActive ? "green" : "red"}
          />
        </li>
        <li className="w-56 flex items-center justify-center">
          <Icon iconName={newsletter ? "check" : "cross"} color={newsletter ? "green" : "red"} />
        </li>
        <li className="w-56 flex items-center justify-center">
          <time>{createdAccount}</time>
        </li>
      </ul>
    </li>
  );
};

export default UsersItem;
