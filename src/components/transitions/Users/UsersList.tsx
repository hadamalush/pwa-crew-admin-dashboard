import Heading from "../../UI/Heading";
import { ComponentPropsWithoutRef } from "react";
import UsersItem, { UserItemProps } from "./UsersItem";
import { cn } from "../../../util/utils";
import SelectSingle from "../../UI/Select/SelectSingle";
import { getDataUserForSearchable } from "../../../global/user-action";
import { useGlobalSelector } from "../../../global/hooks";

type UsersListProps = {
  users: UserItemProps[];
  searchOption: boolean;
} & ComponentPropsWithoutRef<"ul">;

const UsersList = ({ users, searchOption, className }: UsersListProps) => {
  const userState = useGlobalSelector((state) => state.users);
  const userOptions = getDataUserForSearchable(userState);

  return (
    <ul className={cn("min-w-max", className)}>
      {searchOption && (
        <li>
          <SelectSingle
            className="w-96 mxs:w-126 sm:w-full sm:mx-auto p-5 px-10 "
            placeholder="Search user..."
            aria-label="Search user"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            getOptionLabel={(option: any) => `${option.label} (${option.email})`}
            options={userOptions}
          />
        </li>
      )}
      <li>
        <ul className="flex w-full  mt-10 mx-auto font-semibold justify-between text-black dark:text-textPrimary px-10 border-pLight dark:border-borderPrimary border-b pb-10 ">
          <li className="w-72">
            <Heading as="h4" className="ml-10">
              User Name
            </Heading>
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
        return <UsersItem key={index} {...user} />;
      })}
    </ul>
  );
};

export default UsersList;
