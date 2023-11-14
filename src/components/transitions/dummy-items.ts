import { IconNameType } from "../UI/Icons/IconBase";
import { messageItemProps } from "./Inbox/MessageItem";

type DUMMY_MESSAGESTYPE = {
  id: string;
  iconName: IconNameType;
  title: string;
  description: string;
};
type SETTINGSTYPE = {
  id: string;
  iconName: IconNameType;
  title: string;
};

export type DUMMY_STORAGETYPE = {
  [key: string]: {
    labels: string;
    data: number[];
    color: string;
  };
};

export const DUMMY_MESSAGES: DUMMY_MESSAGESTYPE[] = [
  {
    id: "e1",
    iconName: "users",
    title: "Mattew Ovenbake sent you message",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
  {
    id: "e2",
    iconName: "bell",
    title: "Mattew Ovenbake sent you message",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
  {
    id: "e3",
    iconName: "mail",
    title: "Mattew Ovenbake sent you message",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
  {
    id: "e4",
    iconName: "users",
    title: "Mattew Ovenbake sent you message",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
];

export const DUMMY_NOTIFICATIONS = [
  {
    id: "a1",
    avatarSrc: "/woman.webp",
    title: "Mattew Ovenbake sent you message",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
  {
    id: "a2",
    avatarSrc: "/cosmita.webp",
    title: "Mattew Ovenbake sent you message",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
  {
    id: "a3",
    avatarSrc: "/avatar.webp",
    title: "Mattew Ovenbake sent you message",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
  {
    id: "a4",
    avatarSrc: "/cosmita.webp",
    title: "Mattew Ovenbake sent you message",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
];

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
  },
];

export const DUMMY_STORAGE: DUMMY_STORAGETYPE = {
  cloudinary: {
    labels: "cloudinary",
    data: [37, 7],
    color: "#0090e7",
  },
  mega: {
    labels: "mega",
    data: [389, 300],
    color: "#fc424a",
  },
  vercelblob: {
    labels: "vercelblob",
    data: [9, 22],
    color: "#eb904d",
  },
};

export const DUMMY_USERS = [
  {
    name: "Bogdan Szermanc",
    email: "bogdanSzermanc@o2.pl",
    avatarSrc: "laptop.webp",
    accountActive: true,
    newsletter: true,
    createdAccount: "10.12.2019",
  },
  {
    name: "Magdalena Guzdro",
    email: "magdalena.guzdro@gmail.com",
    avatarSrc: "/woman.webp",
    accountActive: false,
    newsletter: true,
    createdAccount: "09.03.2021",
  },
  {
    name: "Khabib Mustafa",
    email: "khabib@protonmail.pl",
    accountActive: false,
    newsletter: false,
    createdAccount: "17.01.2023",
  },
  {
    name: "Monden Welm",
    email: "mondenWelmen1234@gmail.pl",
    avatarSrc: "cosmita.webp",
    accountActive: true,
    newsletter: false,
    createdAccount: "13.07.2021",
  },
  {
    name: "Anna Musk",
    email: "muskanna@twitter.com",
    accountActive: true,
    newsletter: true,
    createdAccount: "19.06.2017",
  },
];

export const DUMMY_INBOXMESSAGES: messageItemProps[] = [
  {
    id: "mes1",
    owner: "Bogdan Szermanc",
    email: "bogdanSzermanc@o2.pl",
    avatarSrc: "laptop.webp",
    subject:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec justo dolor, aliquet vitae efficitur a, pretium vel metus. Sed sapien ligula, iaculis quis erat in, bibendum consectetur sapien.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec justo dolor, aliquet vitae efficitur a, pretium vel metus. Sed sapien ligula, iaculis quis erat in, bibendum consectetur sapien. Cras tincidunt hendrerit orci, ac sodales risus pellentesque eget. Curabitur elementum consequat finibus. Pellentesque finibus lorem sapien, ut lobortis purus blandit non. Maecenas est tellus, condimentum sed erat vel, ullamcorper feugiat dolor. Suspendisse consequat luctus erat, ac fermentum metus aliquet vel. Nunc tincidunt nisl vel scelerisque molestie. Proin eu leo consectetur, bibendum mi ornare, finibus libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse efficitur rhoncus nunc, nec tincidunt turpis.",
    isFeatured: false,
    date: new Date(),
  },
  {
    id: "mes2",
    owner: "Magdalena Guzdro",
    email: "magdalena.guzdro@gmail.com",
    avatarSrc: "/woman.webp",
    subject:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec justo dolor, aliquet vitae efficitur.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec justo dolor, aliquet vitae efficitur a, pretium vel metus. Sed sapien ligula, iaculis quis erat in, bibendum consectetur sapien. Cras tincidunt hendrerit orci, ac sodales risus pellentesque eget. Curabitur elementum consequat finibus. Pellentesque finibus lorem sapien, ut lobortis purus blandit non. Maecenas est tellus, condimentum sed erat vel, ullamcorper feugiat dolor. Suspendisse consequat luctus erat, ac fermentum metus aliquet vel. Nunc tincidunt nisl vel scelerisque molestie. Proin eu leo consectetur, bibendum mi ornare, finibus libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse efficitur rhoncus nunc, nec tincidunt turpis.",
    isFeatured: false,
    date: new Date(),
  },
  {
    id: "mes3",
    owner: "Monden Welm",
    email: "muskanna@twitter.com",
    avatarSrc: "cosmita.webp",
    subject: "Lorem ipsum dolor sit amet.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec justo dolor, aliquet vitae efficitur a, pretium vel metus. Sed sapien ligula, iaculis quis erat in, bibendum consectetur sapien. Cras tincidunt hendrerit orci, ac sodales risus pellentesque eget. Curabitur elementum consequat finibus. .",
    isFeatured: true,
    date: new Date(),
  },
  {
    id: "mes4",
    owner: "Anna Musk",
    email: "annamusk@twitter.com",
    avatarSrc: "laptop.webp",
    subject:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec justo dolor, aliquet vitae efficitur a, pretium vel metus. ",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec justo dolor, aliquet vitae efficitur a, pretium vel metus. Sed sapien ligula, iaculis quis erat in, bibendum consectetur sapien. Cras tincidunt hendrerit orci, ac sodales risus pellentesque eget. Curabitur elementum consequat finibus. Pellentesque finibus lorem sapien, ut lobortis purus blandit non. Maecenas est tellus, condimentum sed erat vel, ullamcorper feugiat dolor. Suspendisse consequat luctus erat, ac fermentum metus aliquet vel. Nunc tincidunt nisl vel scelerisque molestie. Proin eu leo consectetur, bibendum mi ornare, finibus libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse efficitur rhoncus nunc, nec tincidunt turpis.",
    isFeatured: false,
    date: new Date(),
  },
];
