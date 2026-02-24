import { useCrudTable } from "@/hooks/useCrudTable";
import { userService } from "@/services/userService";
import { UserSortKey } from "@/types/table";
import { CreateUserInput, User } from "@/types/user";

export const useUsersTable = () =>
  useCrudTable<User, CreateUserInput, UserSortKey>({
    service: userService,
    searchableKeys: ["name", "email", "role", "status"],
    initialSortBy: "id",
    pageSize: 5,
  });
