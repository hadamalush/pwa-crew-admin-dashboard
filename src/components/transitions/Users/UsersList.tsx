import Heading from "../../UI/Heading";
import { ComponentPropsWithoutRef, useState } from "react";
import UsersItem, { UserItemProps } from "./UsersItem";
import { cn } from "../../../util/utils";
import SelectSingle from "../../UI/Select/SelectSingle";
import { getDataUserForSearchable } from "../../../global/user-action";
import { useGlobalSelector } from "../../../global/hooks";
import { AnimatePresence } from "framer-motion";
import Modal from "../Modal";
import FormEditUser from "../Forms/FormEditUser";
import UserDeletionConfirmation from "../Forms/UserDeletionConfirmation";

type UsersListProps = {
  users: Omit<UserItemProps, "onAction">[];
  searchOption: boolean;
} & ComponentPropsWithoutRef<"ul">;

const UsersList = ({ users, searchOption, className }: UsersListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataUser, setDataUser] = useState({ id: "", email: "", name: "", mode: "" });
  const userState = useGlobalSelector((state) => state.users);
  const userOptions = getDataUserForSearchable(userState);

  const handleActionModal = (action: {
    mode: "edit" | "delete";
    email: string;
    name: string;
    id: string;
  }) => {
    const { mode, id, email, name } = action;
    console.log(mode);
    setDataUser({ id, email, name, mode });
    setIsModalOpen(true);
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
          return <UsersItem key={index} {...user} onAction={handleActionModal} />;
        })}
      </ul>
    </>
  );
};

export default UsersList;
