"use client";
import UsersTable from "@/components/users/UsersTable";
import UsersToolbar from "@/components/users/UsersToolbar";
import { initialUsers } from "@/data/users";
import { User } from "@/types/user";
import React from "react";

const Userpage = () => {
  const [users, setUsers] = React.useState<User[]>(initialUsers);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">کاربران</h1>
      <UsersToolbar />
      <UsersTable users={users} />
    </div>
  );
};

export default Userpage;
