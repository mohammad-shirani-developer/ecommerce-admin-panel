import { userService } from "@/services/userService";
import { CreateUserInput, User } from "@/types/user";
import { useCrudTable } from "./useCrudTable";

export const useUsersTable = () =>
  useCrudTable<User, CreateUserInput, keyof User>({
    service: userService,
    searchableKeys: ["name", "email", "role", "status"],
    initialSortBy: "name",
    pageSize: 5,
  });
