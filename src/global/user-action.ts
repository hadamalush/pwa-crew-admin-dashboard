import { UserState } from "./user-slice";

export const getDataUserForSearchable = (state: UserState) => {
  const allUsers = state.allUsers;
  const convertedUsers = allUsers.map((user) => ({
    value: user.email,
    label: user.username,
    email: user.email,
  }));

  return convertedUsers;
};
