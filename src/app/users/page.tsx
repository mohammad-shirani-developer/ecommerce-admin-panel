"use client";

import ConfirmModal from "@/components/common/ConfirmModal";
import DataTable, { Column } from "@/components/common/DataTable";
import FormModal from "@/components/common/FormModal";
import Pagination from "@/components/common/Pagination";
import EmptyState from "@/components/EmptyState";

import CreateUserForm from "@/components/users/CreateUserForm";
import EditUserForm from "@/components/users/EditUserForm";
import UserStatusBadge from "@/components/users/UserStatusBadge";
import UsersToolbar from "@/components/users/UsersToolbar";

import { useUsersTable } from "@/hooks/useUsersTable";
import { User } from "@/types/user";

import { MdDelete, MdOutlineModeEdit } from "react-icons/md";

const UsersPage = () => {
  const {
    data,
    total,
    page,
    pageSize,
    search,
    sortBy,
    sortDirection,
    setSearch,
    setPage,
    handleSort,
    loading,

    isCreateModalOpen,
    setIsCreateModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,

    editItem,
    deleteItem,

    handleCreate,
    handleEdit,
    handleSave,
    handleDelete,
    confirmDelete,
  } = useUsersTable();

  const columns: Column<User>[] = [
    { key: "id", label: "ID", sortable: true },
    { key: "name", label: "نام", sortable: true },
    { key: "email", label: "ایمیل", sortable: true },
    { key: "role", label: "نقش", sortable: true },
    {
      key: "status",
      label: "وضعیت",
      sortable: true,
      render: (user) => <UserStatusBadge status={user.status} />,
    },
    {
      key: "actions",
      label: "عملیات",
      render: (user) => (
        <div className="flex gap-2">
          <button onClick={() => handleEdit(user)}>
            <MdOutlineModeEdit className="text-xl text-gray-400 hover:text-white" />
          </button>
          <button onClick={() => handleDelete(user)}>
            <MdDelete className="text-xl text-gray-400 hover:text-red-500" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">کاربران</h1>

      {/* Toolbar */}
      <UsersToolbar
        searchValue={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />

      {/* Loading / Empty / Table */}
      {loading ? (
        <div className="text-center py-10">در حال بارگذاری...</div>
      ) : data.length === 0 ? (
        <EmptyState message="هیچ کاربری یافت نشد." />
      ) : (
        <>
          <DataTable<User>
            data={data} // مستقیم از hook می‌گیریم
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

      {/* Create Modal */}
      <FormModal
        isOpen={isCreateModalOpen}
        title="افزودن کاربر"
        onClose={() => setIsCreateModalOpen(false)}
      >
        <CreateUserForm onCreate={handleCreate} />
      </FormModal>

      {/* Edit Modal */}
      <FormModal
        isOpen={isEditModalOpen}
        title="ویرایش کاربر"
        onClose={() => setIsEditModalOpen(false)}
      >
        {editItem && <EditUserForm user={editItem} onSave={handleSave} />}
      </FormModal>

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="حذف کاربر"
        message={`آیا از حذف ${deleteItem?.name ?? ""} مطمئن هستید؟`}
        confirmText="حذف"
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default UsersPage;
