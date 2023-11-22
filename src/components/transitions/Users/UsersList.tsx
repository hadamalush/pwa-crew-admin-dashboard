import Heading from "../../UI/Heading";
import { ComponentPropsWithoutRef } from "react";
// import { DUMMY_USERS } from "../dummy-items";
import UsersItem, { UserItemProps } from "./UsersItem";
import { cn } from "../../../util/utils";
import SelectSingle from "../../UI/Select/SelectSingle";

type UsersListProps = {
  users: UserItemProps[];
} & ComponentPropsWithoutRef<"ul">;

const UsersList = ({ users, className }: UsersListProps) => {
  return (
    <ul className={cn("min-w-max", className)}>
      <li>
        <SelectSingle className="w-full p-5 px-10" />
      </li>
      <li>
        <ul className="flex w-full  mt-10 mx-auto font-semibold justify-between text-black dark:text-textPrimary px-10 border-pLight dark:border-borderPrimary border-b pb-10 ">
          <li className="w-56">
            <Heading as="h4">User Name</Heading>
          </li>
          <li className="w-56 pl-5">
            <Heading as="h4">User Email</Heading>
          </li>
          <li className="w-56  text-center">
            <Heading as="h4">Active account</Heading>
          </li>
          <li className="w-56 text-center">
            <Heading as="h4">Newsletter</Heading>
          </li>
          <li className="w-56 text-center">
            <Heading as="h4">Created Account</Heading>
          </li>
        </ul>
      </li>

      {users.map((user, index) => {
        return <UsersItem key={index} {...user} className={`${index === 4 && "border-none"}`} />;
      })}
    </ul>
  );
};

export default UsersList;
