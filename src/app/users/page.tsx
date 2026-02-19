"use client";

import ConfirmModal from "@/components/common/ConfirmModal";
import FormModal from "@/components/common/FormModal";
import Pagination from "@/components/common/Pagination";
import EmptyState from "@/components/EmptyState";

import CreateUserForm from "@/components/users/CreateUserForm";
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
  } = useUsersTable();

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">کاربران</h1>

      <UsersToolbar
        searchValue={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />

      {!loading && users.length === 0 && (
        <EmptyState message="هیچ کاربری یافت نشد." />
      )}

      <UsersTable
        users={users}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSort={handleSort}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        onToggleStatus={toggleStatus}
      />

      <Pagination
        total={total}
        pageSize={pageSize}
        currentPage={page}
        onPageChange={setPage}
      />

      {/* Create */}
      <FormModal
        isOpen={isCreateModalOpen}
        title="افزودن کاربر"
        onClose={() => setIsCreateModalOpen(false)}
      >
        <CreateUserForm onCreate={handleCreateUser} />
      </FormModal>

      {/* Edit */}
      <FormModal
        isOpen={isEditModalOpen}
        title="ویرایش کاربر"
        onClose={() => setIsEditModalOpen(false)}
      >
        <EditUserForm user={editUser} onSave={handleSaveUser} />
      </FormModal>

      {/* Delete */}
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
