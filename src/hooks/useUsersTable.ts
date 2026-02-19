import { useDataTable } from "@/hooks/useDataTable";
import { userService } from "@/services/userService";

import { UserSortKey } from "@/types/table";
import { CreateUserInput, User } from "@/types/user";
import { useEffect, useState } from "react";

export const useUsersTable = () => {
  // ===== users state =====
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  // ===== modal state =====
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // ===== fetch users =====
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

  // ===== use generic table hook =====
  const table = useDataTable<User, UserSortKey>({
    data: users,
    searchableKeys: ["name", "email", "role", "status"],
    initialSortBy: "id",
    pageSize: 5,
  });

  // ===== CRUD =====
  const handleCreateUser = async (data: CreateUserInput) => {
    try {
      setLoading(true);
      const newUser = await userService.create(data);
      setUsers((prev) => [newUser, ...prev]);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Create user failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = async (updatedUser: User) => {
    try {
      setLoading(true);
      const user = await userService.update(updatedUser);
      setUsers((prev) => prev.map((u) => (u.id === user.id ? user : u)));
    } catch (error) {
      console.error("Update user failed:", error);
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
    } catch (error) {
      console.error("Delete user failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // ===== exposed API =====
  return {
    ...table,

    users: table.data, // برای سازگاری با کامپوننت قبلی

    loading,

    isCreateModalOpen,
    setIsCreateModalOpen,

    isDeleteModalOpen,
    setIsDeleteModalOpen,

    selectedUser,

    handleCreateUser,
    handleEditUser,
    handleDeleteUser,
    confirmDelete,
  };
};
