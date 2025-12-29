"use client";
import Pagination from "@/components/common/Pagination";
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">کاربران</h1>
      <UsersToolbar
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1); // 👈 مهم
        }}
      />
      <UsersTable users={paginatedUsers} onToggleStatus={handleStatusClick} />
      <Pagination
        total={processedUsers.length}
        pageSize={PAGE_SIZE}
        currentPage={page}
        onPageChange={setPage}
      />
    </div>
  );
};

export default Userpage;
