"use client";

import ConfirmModal from "@/components/common/ConfirmModal";
import DataTable, { Column } from "@/components/common/DataTable";
import Pagination from "@/components/common/Pagination";
import EmptyState from "@/components/EmptyState";
import UserStatusBadge from "@/components/users/UserStatusBadge";
import UsersToolbar from "@/components/users/UsersToolbar";

import { useUsersTable } from "@/hooks/useUsersTable";
import { UserSortKey } from "@/types/table";
import { User } from "@/types/user";
import { MdDelete } from "react-icons/md";

const UsersPage = () => {
  const {
    users,
    total,
    page,
    pageSize,
    search,
    sortBy,
    sortDirection,

    deleteUser,
    isDeleteModalOpen,

    setSearch,
    setPage,
    setIsDeleteModalOpen,

    toggleStatus,
    handleSort,
    handleDeleteUser,
    confirmDeleteUser,
  } = useUsersTable();

  const columns: Column<User, UserSortKey>[] = [
    { key: "id", label: "ID", sortable: true },
    { key: "name", label: "نام", sortable: true },
    { key: "email", label: "ایمیل", sortable: true },
    { key: "role", label: "نقش", sortable: true },
    {
      key: "status",
      label: "وضعیت",
      sortable: true,
      render: (user) => (
        <UserStatusBadge
          status={user.status}
          onClick={() => toggleStatus(user.id)}
        />
      ),
    },
    {
      key: "id",
      label: "عملیات",
      render: (user) => (
        <button onClick={() => handleDeleteUser(user)}>
          <MdDelete className="text-xl text-gray-400 hover:text-red-500" />
        </button>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">کاربران</h1>

      <UsersToolbar
        searchValue={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />

      {users.length === 0 ? (
        <EmptyState message="هیچ کاربری یافت نشد." />
      ) : (
        <>
          <DataTable<User, UserSortKey>
            data={users}
            columns={columns}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSort={handleSort}
          />

          <Pagination
            total={total}
            pageSize={pageSize}
            currentPage={page}
            onPageChange={setPage}
          />
        </>
      )}

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="حذف کاربر"
        message={`آیا از حذف ${deleteUser?.name} مطمئن هستید؟`}
        confirmText="حذف"
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteUser}
      />
    </div>
  );
};

export default UsersPage;
