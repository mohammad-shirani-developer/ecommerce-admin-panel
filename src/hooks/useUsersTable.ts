// hooks/useUsersTable.ts
import { userService } from "@/services/userService";
import { UserSortKey } from "@/types/table";
import { CreateUserInput, User } from "@/types/user";
import { filterItems } from "@/utils/filterItems";
import { paginate } from "@/utils/paginate";
import { sortItems } from "@/utils/sortItems";
import { useEffect, useMemo, useState } from "react";

const PAGE_SIZE = 5;

export const useUsersTable = () => {
  // ===== data =====
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // ===== table state =====
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<UserSortKey>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

  // ===== modal state =====
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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

  const toggleStatus = (userId: number) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === "active" ? "inactive" : "active" }
          : u,
      ),
    );
  };

  const handleCreateUser = async (data: CreateUserInput) => {
    const created = await userService.create(data);
    setUsers((prev) => [created, ...prev]);
    setIsCreateModalOpen(false);
  };

  const handleEditUser = (user: User) => {
    setEditUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveUser = async (updated: User) => {
    await userService.update(updated);
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    setEditUser(null);
    setIsEditModalOpen(false);
  };

  const handleDeleteUser = (user: User) => {
    setDeleteUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteUser = async () => {
    if (!deleteUser) return;

    await userService.remove(deleteUser.id);
    setUsers((prev) => prev.filter((u) => u.id !== deleteUser.id));
    setDeleteUser(null);
    setIsDeleteModalOpen(false);
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

    // modal state
    editUser,
    deleteUser,
    isEditModalOpen,
    isDeleteModalOpen,
    isCreateModalOpen,

    // setters
    setSearch,
    setPage,
    setIsCreateModalOpen,
    setIsEditModalOpen,
    setIsDeleteModalOpen,

    // actions
    handleSort,
    handleCreateUser,
    handleEditUser,
    handleSaveUser,
    handleDeleteUser,
    confirmDeleteUser,
    toggleStatus,
  };
};
