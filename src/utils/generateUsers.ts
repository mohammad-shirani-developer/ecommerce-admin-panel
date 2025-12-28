import { User } from "@/types/user";

export const generateUsers = (count: number): User[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `کاربر ${index + 1}`,
    email: `user${index + 1}@example.com`,
    status: index % 2 === 0 ? "active" : "inactive",
  }));
};
