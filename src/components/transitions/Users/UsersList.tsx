import Heading from "../../UI/Heading";
import { type ComponentPropsWithoutRef, useState } from "react";
import UsersItem from "./UsersItem";
import { cn } from "../../../util/utils";
import SelectSingle from "../../UI/Select/SelectSingle";
import { getDataUserForSearchable } from "../../../global/user-action";
import { useGlobalSelector } from "../../../global/hooks";
import { AnimatePresence } from "framer-motion";
import Modal from "../Modal";
import FormEditUser from "../Forms/FormEditUser";
import UserDeletionConfirmation from "../Forms/UserDeletionConfirmation";
import { UserProps } from "../../../global/user-slice";
import Pagination from "../Pagination";

type UsersListProps = {
  searchOption: boolean;
} & ComponentPropsWithoutRef<"ul">;

type UserOption = {
  value: string;
  label: string;
  email: string;
};

const UsersList = ({ searchOption, className }: UsersListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataUser, setDataUser] = useState({ id: "", email: "", name: "", mode: "" });
  const userState = useGlobalSelector((state) => state.users);
  const userOptions = getDataUserForSearchable(userState);
  const allUsers = userState.allUsers;
  const [filteredUsers, setFilteredUsers] = useState(allUsers);
  const [foundUser, setFoundUser] = useState<UserProps | null>(null);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const lastMessIndex = currentPage * itemsPerPage;
  const firstMessIndex = lastMessIndex - itemsPerPage;
  const currentUsers = filteredUsers.slice(firstMessIndex, lastMessIndex);

  const handleActionModal = (action: {
    mode: "edit" | "delete";
    email: string;
    name: string;
    id: string;
  }) => {
    const { mode, id, email, name } = action;
    setDataUser({ id, email, name, mode });
    setIsModalOpen(true);
  };

  const handleSearchUser = (inputValue: string) => {
    const filteredUser = allUsers.filter(
      (user) =>
        user.email.toLocaleLowerCase().includes(inputValue) ||
        user.name.toLocaleLowerCase().includes(inputValue)
    );

    setFilteredUsers(filteredUser);
  };

  const handleSearchUserPrecise = (inputValue: unknown) => {
    const foundUser = inputValue as UserOption;

    if (foundUser) {
      const currentUser = allUsers.find((user) => user.email === foundUser.email);

      if (currentUser) setFoundUser(currentUser);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isModalOpen && (
          <Modal
            onClose={() => setIsModalOpen(false)}
            className="sm:w-[50rem]  h-full sm:h-auto overflow-y-auto rounded-none sm:rounded-xl"
            title={dataUser.mode === "delete" ? "User deletion" : "User edit"}
          >
            {dataUser.mode === "edit" && <FormEditUser initialData={dataUser} />}
            {dataUser.mode === "delete" && <UserDeletionConfirmation initialData={dataUser} />}
          </Modal>
        )}
      </AnimatePresence>

      <ul className={cn("min-w-max", className)}>
        {searchOption && (
          <li>
            <SelectSingle
              className="w-96 mxs:w-126 sm:w-full sm:mx-auto p-5 px-10 "
              placeholder="Search user..."
              aria-label="Search user"
              onInputChange={(inputValue) => handleSearchUser(inputValue.toLocaleLowerCase())}
              onChange={handleSearchUserPrecise}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              getOptionLabel={(option: any) => `${option.label} (${option.email})`}
              options={userOptions}
            />
          </li>
        )}
        <li>
          <ul className="flex w-full  mt-10 mx-auto font-semibold justify-between text-black dark:text-textPrimary px-10 border-pLight dark:border-borderPrimary border-b pb-10 ">
            <li className="w-72">
              <Heading as="h3" className="ml-10">
                User Name
              </Heading>
            </li>
            <li className="w-56 pl-5">
              <Heading as="h3">User Email</Heading>
            </li>
            <li className="w-56  text-center">
              <Heading as="h3">Active account</Heading>
            </li>
            <li className="w-56 text-center">
              <Heading as="h3">Newsletter</Heading>
            </li>
            <li className="w-56 text-center">
              <Heading as="h3">Created Account</Heading>
            </li>
          </ul>
        </li>

        {foundUser && (
          <UsersItem
            key="foundUser49"
            {...foundUser}
            onAction={handleActionModal}
            className="dark:bg-navItemActive bg-sky-200"
          />
        )}
        {currentUsers.map((user, index) => {
          const ifIsLastItem = currentUsers.length;

          return (
            <UsersItem
              key={user.id}
              {...user}
              onAction={handleActionModal}
              className={cn({ "border-none": ifIsLastItem === index + 1 })}
            />
          );
        })}

        <li>
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            itemsAllAmount={filteredUsers.length}
            onChangePage={setCurrentPage}
            className="p-10 md:py-0"
          />
        </li>
      </ul>
    </>
  );
};

export default UsersList;
