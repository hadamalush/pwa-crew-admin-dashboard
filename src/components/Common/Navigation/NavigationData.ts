import { NavItemProps } from "./NavItem";

export const MainNavbarItems: NavItemProps[] = [
  {
    id: "mainNav1",
    to: "/dashboard",
    icon: "dashboard",
    iconColor: "purple",
    title: "Dashboard",
  },
  {
    id: "mainNav2",
    to: "/inbox",
    icon: "mail",
    iconColor: "blue",
    title: "Inbox",
  },
  {
    id: "mainNav3",
    to: "/users",
    icon: "users",
    iconColor: "green",
    title: "Users",
  },
  {
    id: "mainNav5",
    to: "/settings",
    icon: "settings",
    iconColor: "yellow",
    title: "Settings",
  },
  {
    id: "mainNav6",
    to: "/test",
    icon: "power",
    iconColor: "red",
    title: "Sign out",
  },
];
export const InboxNavbarItems: NavItemProps[] = [
  {
    id: "inboxNav1",
    to: "/inbox",
    icon: "inbox",
    iconColor: "purple",
    title: "Inbox",
  },
  {
    id: "inboxNav2",
    to: "/inbox/sent",
    icon: "sent",
    iconColor: "blue",
    title: "Sent",
  },
  {
    id: "inboxNav3",
    to: "/inbox/featured",
    icon: "star",
    iconColor: "yellow",
    title: "Featured",
  },
  {
    id: "inboxNav4",
    to: "/inbox/spam",
    icon: "flame",
    iconColor: "green",
    title: "Spam",
  },
  {
    id: "inboxNav5",
    to: "/inbox/trash",
    icon: "trash",
    iconColor: "yellow",
    title: "Trash",
  },
];
