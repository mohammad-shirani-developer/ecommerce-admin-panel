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
    return sortDirection === "asc" ? "▲" : "▼";
  };

  if (users.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10">
        کاربری برای نمایش وجود ندارد
      </div>
    );
  }

  return (
    <table className="w-full table-auto text-right border border-gray-700 text-sm">
      <thead className="bg-gray-800 text-gray-200">
        <tr>
          <th className="cursor-pointer px-4 py-2" onClick={() => onSort("id")}>
            ID {renderSortIcon("id")}
          </th>

          <th
            className="cursor-pointer px-4 py-2"
            onClick={() => onSort("name")}
          >
            نام {renderSortIcon("name")}
          </th>

          <th
            className="cursor-pointer px-4 py-2"
            onClick={() => onSort("email")}
          >
            ایمیل {renderSortIcon("email")}
          </th>

          <th
            className="cursor-pointer px-4 py-2"
            onClick={() => onSort("role")}
          >
            نقش {renderSortIcon("role")}
          </th>

          <th
            className="cursor-pointer px-4 py-2"
            onClick={() => onSort("status")}
          >
            وضعیت {renderSortIcon("status")}
          </th>

          <th className="px-4 py-2">عملیات</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr
            key={user.id}
            className="border-t border-gray-700 hover:bg-gray-700 transition-colors"
          >
            <td className="px-4 py-2">{user.id}</td>
            <td className="px-4 py-2">{user.name}</td>
            <td className="px-4 py-2">{user.email}</td>
            <td className="px-4 py-2">{user.role}</td>

            <td
              className="px-4 py-2 cursor-pointer"
              onClick={() => onToggleStatus(user.id)}
            >
              <span
                className={
                  user.status === "active" ? "text-green-400" : "text-red-400"
                }
              >
                {user.status === "active" ? "فعال" : "غیرفعال"}
              </span>
            </td>

            <td className="px-4 py-2 space-x-3">
              <button
                onClick={() => onEdit(user)}
                className="text-blue-400 hover:underline"
              >
                ویرایش
              </button>

              <button
                onClick={() => onDelete(user)}
                className="text-red-400 hover:underline"
              >
                حذف
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
