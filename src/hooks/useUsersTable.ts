"use client";

import { usersDB as mockUsers } from "@/data/users";
import { UserSortKey } from "@/types/table";
import { User } from "@/types/user";
import { filterItems } from "@/utils/filterItems";
import { paginate } from "@/utils/paginate";
import { sortItems } from "@/utils/sortItems";
import { useMemo, useState } from "react";

const PAGE_SIZE = 5;

export const useUsersTable = () => {
  // ===== state =====
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<UserSortKey>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // ===== actions =====

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
          ? {
              ...u,
              status: u.status === "active" ? "inactive" : "active",
            }
          : u,
      ),
    );
  };

  const handleEditUser = (user: User) => {
    setEditUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveUser = (updatedUser: User) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
    );
    setEditUser(null);
    setIsEditModalOpen(false);
  };

  const handleDeleteUser = (user: User) => {
    setDeleteUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteUser = () => {
    if (!deleteUser) return;

    setUsers((prev) => prev.filter((u) => u.id !== deleteUser.id));
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

  // ===== exposed API =====
  return {
    // data
    users: paginatedUsers,
    total: processedUsers.length,
    page,
    pageSize: PAGE_SIZE,
    search,
    sortBy,
    sortDirection,

    // modal state
    editUser,
    deleteUser,
    isEditModalOpen,
    isDeleteModalOpen,

    // setters
    setSearch,
    setPage,
    setIsEditModalOpen,
    setIsDeleteModalOpen,

    // actions
    handleSort,
    toggleStatus,
    handleEditUser,
    handleSaveUser,
    handleDeleteUser,
    confirmDeleteUser,
  };
};
