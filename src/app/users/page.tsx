"use client";
import Pagination from "@/components/common/Pagination";
import DeleteUserModal from "@/components/users/DeleteUserModal";
import EditUserModal from "@/components/users/EditUserModal";
import UsersTable from "@/components/users/UsersTable";
import UsersToolbar from "@/components/users/UsersToolbar";
import { User } from "@/types/user";
import { filterItems } from "@/utils/filterItems";
import { generateUsers } from "@/utils/generateUsers";
import { paginate } from "@/utils/paginate";
import { sortItems } from "@/utils/sortItems";
import { useMemo, useState } from "react";

const PAGE_SIZE = 10;

const Userpage = () => {
  const initialUser = generateUsers(20);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>(initialUser);
  const [sortBy, setSortBy] = useState<keyof User>("id");
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
    const sorted = sortItems(filtered, sortBy);
    return sorted;
  }, [users, search, sortBy]);

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
      <DeleteUserModal
        user={deleteUser}
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onDelete={handleDeletedUser}
      />
    </div>
  );
};

export default Userpage;
