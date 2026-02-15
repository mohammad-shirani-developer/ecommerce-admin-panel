import { usersDB } from "@/data/users";
import { UserSortKey } from "@/types/table";
import { User } from "@/types/user";
import { filterItems } from "@/utils/filterItems";
import { paginate } from "@/utils/paginate";
import { sortItems } from "@/utils/sortItems";
import { useMemo, useState } from "react";

const PAGE_SIZE = 5;

export const useUsersTable = () => {
  const [users] = useState<User[]>(usersDB);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<UserSortKey>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

  const processedUsers = useMemo(() => {
    const filtered = filterItems(users, search, [
      "name",
      "email",
      "role",
      "status",
    ]);

    return sortItems(filtered, sortBy, sortDirection);
  }, [users, search, sortBy, sortDirection]);

  const paginatedUsers = useMemo(
    () => paginate(processedUsers, page, PAGE_SIZE),
    [processedUsers, page],
  );

  const handleSort = (key: UserSortKey) => {
    setPage(1);
    if (sortBy === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDirection("asc");
    }
  };

  return {
    users: paginatedUsers,
    total: processedUsers.length,
    page,
    pageSize: PAGE_SIZE,
    search,
    sortBy,
    sortDirection,

    setSearch,
    setPage,
    handleSort,
  };
};
