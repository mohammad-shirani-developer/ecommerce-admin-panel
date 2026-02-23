"use client";
import Pagination from "@/components/common/Pagination";
import CreateUserModal from "@/components/users/CreateUsersModal";
import DeleteUserModal from "@/components/users/DeleteUsersModal";
import UsersTable from "@/components/users/UsersTable";
import UsersToolbar from "@/components/users/UsersToolbar";
import { useUsersTable } from "@/hooks/useUsersTable";

const UsersPage = () => {
  const {
    data: users,
    total,
    search,
    page,
    pageSize,
    sortBy,
    sortDirection,
    setSearch,
    setPage,
    handleSort,
    loading,
    isCreateModalOpen,
    setIsCreateModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    selectedUser,
    handleCreateUser,
    handleEditUser,
    handleToggleStatus,
    handleDeleteUser,
    confirmDelete,
  } = useUsersTable();

  return (
    <>
      <UsersToolbar
        searchValue={search}
        onSearchChange={setSearch}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />

      <UsersTable
        users={users}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSort={handleSort}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        onToggleStatus={handleToggleStatus}
      />

      {isCreateModalOpen && (
        <CreateUserModal
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreateUser}
        />
      )}

      {isDeleteModalOpen && selectedUser && (
        <DeleteUserModal
          user={selectedUser}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          loading={loading}
        />
      )}

      <Pagination
        total={total}
        pageSize={pageSize}
        currentPage={page}
        onPageChange={setPage}
      />
    </>
  );
};

export default UsersPage;
