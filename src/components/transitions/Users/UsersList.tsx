import Heading from "../../UI/Heading";
import { ComponentPropsWithoutRef, FC } from "react";
import { DUMMY_USERS } from "../dummy-items";
import UsersItem from "./UsersItem";

const UsersList: FC<ComponentPropsWithoutRef<"ul">> = () => {
  return (
    <ul className="min-w-max">
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

      {DUMMY_USERS.map((user, index) => {
        return <UsersItem {...user} className={`${index === 4 && "border-none"}`} />;
      })}
    </ul>
  );
};

export default UsersList;
