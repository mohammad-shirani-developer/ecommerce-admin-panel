import { User } from "@/types/user";

export let usersDB: User[] = [
  {
    id: 1,
    name: "علی رضایی",
    email: "ali.rezaei@gmail.com",
    role: "admin",
    status: "active",
  },
  {
    id: 2,
    name: "محمد احمدی",
    email: "m.ahmadi@gmail.com",
    role: "user",
    status: "inactive",
  },
  {
    id: 3,
    name: "سارا محمدی",
    email: "sara.mohammadi@gmail.com",
    role: "user",
    status: "active",
  },
  {
    id: 4,
    name: "مریم حسینی",
    email: "maryam.hosseini@gmail.com",
    role: "admin",
    status: "active",
  },
  {
    id: 5,
    name: "امیر جعفری",
    email: "amir.jafari@gmail.com",
    role: "user",
    status: "inactive",
  },
  {
    id: 6,
    name: "نرگس کریمی",
    email: "narges.karimi@gmail.com",
    role: "user",
    status: "active",
  },
  {
    id: 7,
    name: "رضا موسوی",
    email: "reza.mousavi@gmail.com",
    role: "admin",
    status: "active",
  },
  {
    id: 8,
    name: "فاطمه عباسی",
    email: "fateme.abbasi@gmail.com",
    role: "user",
    status: "inactive",
  },
  {
    id: 9,
    name: "حسین کاظمی",
    email: "hossein.kazemi@gmail.com",
    role: "user",
    status: "active",
  },
  {
    id: 10,
    name: "الهام قربانی",
    email: "elham.ghorbani@gmail.com",
    role: "admin",
    status: "active",
  },
];

export const getUsersDB = () => usersDB;

export const setUsersDB = (newUsers: User[]) => {
  usersDB = newUsers;
};
