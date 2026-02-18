// hooks/useUsersTable.ts
import { userService } from "@/services/userService";
import { UserSortKey } from "@/types/table";
import { User } from "@/types/user";
import { filterItems } from "@/utils/filterItems";
import { paginate } from "@/utils/paginate";
import { sortItems } from "@/utils/sortItems";
import { useEffect, useMemo, useState } from "react";

const PAGE_SIZE = 5;

export const useUsersTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<UserSortKey>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

  // ===== fetch =====
  useEffect(() => {
    userService.getAll().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  // ===== derived =====
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

  // ===== actions =====
  const handleSort = (key: UserSortKey) => {
    setPage(1);
    if (sortBy === key) {
      setSortDirection((p) => (p === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDirection("asc");
    }
  };

  const deleteUser = async (id: number) => {
    await userService.remove(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return {
    // data
    users: paginatedUsers,
    total: processedUsers.length,
    page,
    pageSize: PAGE_SIZE,
    search,
    sortBy,
    sortDirection,
    loading,

    // setters
    setSearch,
    setPage,

    // actions
    handleSort,
    deleteUser,
  };
};
