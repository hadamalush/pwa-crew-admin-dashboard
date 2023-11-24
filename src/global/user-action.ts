import { UserState } from "./user-slice";

export const getDataUserForSearchable = (state: UserState) => {
  const allUsers = state.allUsers;
  const convertedUsers = allUsers.map((user) => ({
    value: user.email,
    label: user.name,
    email: user.email,
  }));

  return convertedUsers;
};
