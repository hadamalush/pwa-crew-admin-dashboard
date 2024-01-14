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

export const getLastWeek = () => {
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();

    date.setDate(date.getDate() - i);
    const day = date.getDate();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  });

  return dates;
};
