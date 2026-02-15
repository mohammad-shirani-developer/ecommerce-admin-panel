"use client";

import Pagination from "@/components/common/Pagination";
import EmptyState from "@/components/EmptyState";
import UsersTable from "@/components/users/UsersTable";
import UsersToolbar from "@/components/users/UsersToolbar";
import { useUsersTable } from "@/hooks/useUsersTable";

const UsersPage = () => {
  const {
    users,
    total,
    page,
    pageSize,
    search,
    sortBy,
    sortDirection,
    setSearch,
    setPage,
    handleSort,
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

      {users.length === 0 && <EmptyState message="کاربری یافت نشد" />}

      <UsersTable
        users={users}
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
    </div>
  );
};

export default UsersPage;
