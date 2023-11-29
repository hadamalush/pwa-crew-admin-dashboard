import { IconNameType } from "../UI/Icons/IconBase";

type SETTINGSTYPE = {
  id: string;
  iconName: IconNameType;
  title: string;
  action?: "logout";
};

export const SETTINGS: SETTINGSTYPE[] = [
  {
    id: "s1",
    iconName: "settings",
    title: "Settings",
  },
  {
    id: "s2",
    iconName: "power",
    title: "Sign out",
    action: "logout",
  },
];
