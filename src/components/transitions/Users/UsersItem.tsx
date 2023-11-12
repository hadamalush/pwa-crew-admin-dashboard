import Icon from "../../UI/Icons/Icon";
import Avatar from "../Avatar";
import { type ComponentPropsWithoutRef } from "react";

type UserItemProps = {
  name: string;
  avatarSrc?: string;
  email: string;
  accountActive: boolean;
  newsletter: boolean;
  createdAccount: string;
} & ComponentPropsWithoutRef<"li">;

const UsersItem = ({
  name,
  avatarSrc,
  email,
  accountActive,
  newsletter,
  createdAccount,
  ...props
}: UserItemProps) => {
  const avatarImg = avatarSrc ? avatarSrc : "/anonymous.webp";

  return (
    <li {...props}>
      <ul className="flex w-full mx-auto font-semibold justify-between text-black dark:text-white px-10 border-pLight dark:border-borderPrimary border-b py-10">
        <li className="w-56 flex items-center">
          <Avatar src={avatarImg} size="s2" />
          <p className="inline p-2 overflow-hidden text-ellipsis whitespace-nowrap max-w-125">
            {name}
          </p>
        </li>
        <li className="w-56 flex items-center ">
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
