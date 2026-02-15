"use client";

import ConfirmModal from "@/components/common/ConfirmModal";
import FormModal from "@/components/common/FormModal";
import Pagination from "@/components/common/Pagination";
import EmptyState from "@/components/EmptyState";

import EditUserForm from "@/components/users/EditUserForm";
import UsersTable from "@/components/users/UsersTable";
import UsersToolbar from "@/components/users/UsersToolbar";

import { useUsersTable } from "@/hooks/useUsersTable";

const UsersPage = () => {
  const {
    // data
    users,
    total,
    page,
    pageSize,
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
  } = useUsersTable();

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

      {users.length === 0 && <EmptyState message="هیچ کاربری یافت نشد." />}

      <UsersTable
        users={users}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSort={handleSort}
        onToggleStatus={toggleStatus}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />

      <Pagination
        total={total}
        pageSize={pageSize}
        currentPage={page}
        onPageChange={setPage}
      />

      {/* Edit Modal */}
      <FormModal
        isOpen={isEditModalOpen}
        title="ویرایش کاربر"
        onClose={() => setIsEditModalOpen(false)}
      >
        <EditUserForm user={editUser} onSave={handleSaveUser} />
      </FormModal>

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
