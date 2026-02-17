import { usersDB } from "@/data/users";
import { UserSortKey } from "@/types/table";
import { User } from "@/types/user";
import { filterItems } from "@/utils/filterItems";
import { paginate } from "@/utils/paginate";
import { sortItems } from "@/utils/sortItems";
import { useMemo, useState } from "react";

const PAGE_SIZE = 5;

export const useUsersTable = () => {
  // ===== data =====
  const [users, setUsers] = useState<User[]>(usersDB);

  // ===== table state =====
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<UserSortKey>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

  // ===== modal state =====
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // ===== actions =====

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1); // UX polish
  };

  const handleSort = (key: UserSortKey) => {
    setPage(1);
    if (sortBy === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDirection("asc");
    }
  };

  const toggleStatus = (userId: number) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === "active" ? "inactive" : "active" }
          : u,
      ),
    );
  };

  const openDeleteModal = (user: User) => {
    setDeleteUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteUser = () => {
    if (!deleteUser) return;

    setUsers((prev) => prev.filter((u) => u.id !== deleteUser.id));
    setDeleteUser(null);
    setIsDeleteModalOpen(false);
  };

  const closeDeleteModal = () => {
    setDeleteUser(null);
    setIsDeleteModalOpen(false);
  };

  // ===== derived data =====

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

  return {
    // data
    users: paginatedUsers,
    total: processedUsers.length,
    page,
    pageSize: PAGE_SIZE,
    search,
    sortBy,
    sortDirection,

    // modal
    deleteUser,
    isDeleteModalOpen,

    // handlers
    handleSearch,
    handleSort,
    toggleStatus,
    openDeleteModal,
    confirmDeleteUser,
    closeDeleteModal,

    // setters (needed by Pagination / Modal)
    setPage,
    setIsDeleteModalOpen,
  };
};
