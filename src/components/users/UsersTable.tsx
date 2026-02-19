"use client";

import { UserSortKey } from "@/types/table";
import { User } from "@/types/user";

interface UsersTableProps {
  users: User[];
  sortBy: UserSortKey;
  sortDirection: "asc" | "desc";
  onSort: (key: UserSortKey) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onToggleStatus: (userId: number) => void;
}

const UsersTable = ({
  users,
  sortBy,
  sortDirection,
  onSort,
  onEdit,
  onDelete,
  onToggleStatus,
}: UsersTableProps) => {
  const renderSortIcon = (key: UserSortKey) => {
    if (sortBy !== key) return null;
    return sortDirection === "asc" ? " ▲" : " ▼";
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-700 text-sm">
        <thead className="bg-gray-800 text-gray-200">
          <tr>
            <th className="cursor-pointer p-2" onClick={() => onSort("id")}>
              ID{renderSortIcon("id")}
            </th>
            <th className="cursor-pointer p-2" onClick={() => onSort("name")}>
              نام{renderSortIcon("name")}
            </th>
            <th className="cursor-pointer p-2" onClick={() => onSort("email")}>
              ایمیل{renderSortIcon("email")}
            </th>
            <th className="cursor-pointer p-2" onClick={() => onSort("role")}>
              نقش{renderSortIcon("role")}
            </th>
            <th className="cursor-pointer p-2" onClick={() => onSort("status")}>
              وضعیت{renderSortIcon("status")}
            </th>
            <th className="p-2">عملیات</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t border-gray-700 text-center">
              <td className="p-2">{user.id}</td>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2">
                <button
                  onClick={() => onToggleStatus(user.id)}
                  className={`rounded px-2 py-1 text-xs ${
                    user.status === "active" ? "bg-green-600" : "bg-gray-600"
                  }`}
                >
                  {user.status === "active" ? "فعال" : "غیرفعال"}
                </button>
              </td>
              <td className="p-2 flex justify-center gap-2">
                <button
                  onClick={() => onEdit(user)}
                  className="rounded bg-blue-600 px-2 py-1 text-xs text-white"
                >
                  ویرایش
                </button>
                <button
                  onClick={() => onDelete(user)}
                  className="rounded bg-red-600 px-2 py-1 text-xs text-white"
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td colSpan={6} className="p-4 text-center text-gray-400">
                کاربری یافت نشد
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
