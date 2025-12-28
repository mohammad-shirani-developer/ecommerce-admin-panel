"use client";
import UsersTable from "@/components/users/UsersTable";
import UsersToolbar from "@/components/users/UsersToolbar";
import { initialUsers } from "@/data/users";
import { User } from "@/types/user";
import { filterItems } from "@/utils/filterItems";
import { sortItems } from "@/utils/sortItems";
import { useMemo, useState } from "react";

const Userpage = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [sortBy, setSortBy] = useState<keyof User>("id");

  const visibleUsers = useMemo(() => {
    const filtered = filterItems(users, search, ["name", "email"]);
    return sortItems(filtered, sortBy, "asc");
  }, [users, search, sortBy]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">کاربران</h1>
      <UsersToolbar onSearchChange={setSearch} />
      <UsersTable users={visibleUsers} />
    </div>
  );
};

export default Userpage;
