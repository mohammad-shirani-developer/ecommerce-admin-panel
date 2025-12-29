"use client";
import ConfirmModal from "@/components/common/ConfirmModal";
import Pagination from "@/components/common/Pagination";
import EditUserModal from "@/components/users/EditUserModal";
import UsersTable from "@/components/users/UsersTable";
import UsersToolbar from "@/components/users/UsersToolbar";
import { users as mockUsers } from "@/data/users";
import { User } from "@/types/user";
import { filterItems } from "@/utils/filterItems";
import { paginate } from "@/utils/paginate";
import { sortItems } from "@/utils/sortItems";
import { useMemo, useState } from "react";

const PAGE_SIZE = 5;

const Userpage = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [sortBy, setSortBy] = useState<keyof User>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleStatusClick = (userId: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === "active" ? "inactive" : "active",
            }
          : user
      )
    );
  };

  const processedUsers = useMemo(() => {
    const filtered = filterItems(users, search, ["name", "email"]);
    const sorted = sortItems(filtered, sortBy, sortDirection);
    return sorted;
  }, [users, search, sortBy, sortDirection]);

  const paginatedUsers = useMemo(
    () => paginate(processedUsers, page, PAGE_SIZE),
    [processedUsers, page]
  );

  const handleEditUser = (user: User) => {
    setEditUser(user);
    setIsModalOpen(true);
  };
  const handleDeleteUser = (user: User) => {
    setDeleteUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleSaveUser = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditUser(null);
    setIsModalOpen(false);
  };
  const handleDeletedUser = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== updatedUser.id)
    );
    setDeleteUser(null);
    setIsDeleteModalOpen(false);
  };

  const handleCloseModal = () => {
    setEditUser(null);
    setIsModalOpen(false);
  };
  const handleCloseDeleteModal = () => {
    setDeleteUser(null);
    setIsDeleteModalOpen(false);
  };

  const handleSort = (key: keyof User) => {
    setPage(1);

    if (sortBy === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDirection("asc");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">کاربران</h1>
      <UsersToolbar
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
      />
      <UsersTable
        users={paginatedUsers}
        onToggleStatus={handleStatusClick}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        onSort={handleSort}
        sortBy={sortBy}
        sortDirection={sortDirection}
      />
      <Pagination
        total={processedUsers.length}
        pageSize={PAGE_SIZE}
        currentPage={page}
        onPageChange={setPage}
      />
      <EditUserModal
        user={editUser}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveUser}
      />
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="حذف کاربر"
        message={`آیا از حذف ${deleteUser?.name} مطمئن هستید؟`}
        confirmText="حذف"
        onCancel={handleCloseDeleteModal}
        onConfirm={() => handleDeletedUser(deleteUser!)}
      />
    </div>
  );
};

export default Userpage;
