import { User } from "@/types/user";
import { generateUsers } from "@/utils/generateUsers";

export const fetchUsers = async (): Promise<User[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return generateUsers(20);
};
