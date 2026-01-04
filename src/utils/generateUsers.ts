import { User } from "@/types/user";

const firstNames = [
  "محمد",
  "علی",
  "رضا",
  "حسین",
  "مهدی",
  "سارا",
  "نرگس",
  "زهرا",
  "فاطمه",
  "نگین",
];

const lastNames = [
  "احمدی",
  "رضایی",
  "محمدی",
  "حسینی",
  "کریمی",
  "جعفری",
  "قاسمی",
  "مرادی",
];

export const generateUsers = (count: number): User[] => {
  return Array.from({ length: count }, (_, index) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    return {
      id: index + 1,
      name: `${firstName} ${lastName}`,
      email: `${firstName}.${lastName}${index + 1}@example.com`.toLowerCase(),
      status: Math.random() > 0.3 ? "active" : "inactive",
    };
  });
};
