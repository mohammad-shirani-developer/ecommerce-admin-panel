import { useDataTable } from "@/hooks/useDataTable";
import { userService } from "@/services/userService";

import { UserSortKey } from "@/types/table";
import { CreateUserInput, User } from "@/types/user";
import { useEffect, useState } from "react";

export const useUsersTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAll();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const table = useDataTable<User, UserSortKey>({
    data: users,
    searchableKeys: ["name", "email", "role", "status"],
    initialSortBy: "id",
  });

  const handleCreateUser = async (data: CreateUserInput) => {
    try {
      setLoading(true);
      const newUser = await userService.create(data);
      setUsers((prev) => [newUser, ...prev]);
      setIsCreateModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (userId: number) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    try {
      setLoading(true);

      const updatedUser = await userService.update({
        ...user,
        status: user.status === "active" ? "inactive" : "active",
      });

      setUsers((prev) =>
        prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = async (updated: User) => {
    try {
      setLoading(true);
      const user = await userService.update(updated);
      setUsers((prev) => prev.map((u) => (u.id === user.id ? user : u)));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;

    try {
      setLoading(true);
      await userService.remove(selectedUser.id);
      setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    data: table.data,
    total: table.total,

    search: table.search,
    page: table.page,
    pageSize: table.pageSize,
    sortBy: table.sortBy,
    sortDirection: table.sortDirection,

    setSearch: table.setSearch,
    setPage: table.setPage,
    handleSort: table.handleSort,

    loading,

    isCreateModalOpen,
    setIsCreateModalOpen,

    isDeleteModalOpen,
    setIsDeleteModalOpen,

    selectedUser,

    handleCreateUser,
    handleEditUser,
    handleDeleteUser,
    handleToggleStatus,
    confirmDelete,
  };
};
