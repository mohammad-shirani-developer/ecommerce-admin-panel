import { User } from "@/types/user";
import { MdDelete, MdOutlineModeEdit } from "react-icons/md";
import UserStatusBadge from "./UserStatusBadge";

interface UsersTableProps {
  users: User[];
  onToggleStatus: (userId: number) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onSort: (key: keyof User) => void;
  sortBy: keyof User;
  sortDirection: "asc" | "desc";
}

const UsersTable = ({
  users,
  onToggleStatus,
  onEdit,
  onDelete,
  onSort,
  sortBy,
  sortDirection,
}: UsersTableProps) => {
  return (
    <table className="w-full text-right table-auto border border-gray-700 text-sm">
      <thead className="bg-gray-800 text-gray-200">
        <tr className="bg-gray-800">
          <th
            onClick={() => onSort("id")}
            className="cursor-pointer select-none"
          >
            ID {sortBy === "id" && (sortDirection === "asc" ? "▲" : "▼")}
          </th>
          <th
            onClick={() => onSort("name")}
            className="cursor-pointer select-none"
          >
            نام {sortBy === "name" && (sortDirection === "asc" ? "▲" : "▼")}
          </th>
          <th
            onClick={() => onSort("email")}
            className="cursor-pointer select-none"
          >
            ایمیل {sortBy === "email" && (sortDirection === "asc" ? "▲" : "▼")}
          </th>
          <th className="py-2 px-4 border-b border-gray-700">وضعیت</th>
          <th className="py-2 px-4 border-b border-gray-700">عملیات</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="hover:bg-gray-700 transition-colors">
            <td className="py-2 px-4 border-b border-gray-700">{user.id}</td>
            <td className="py-2 px-4 border-b border-gray-700">{user.name}</td>
            <td className="py-2 px-4 border-b border-gray-700">{user.email}</td>
            <td className="py-2 px-4 border-b border-gray-700">
              <UserStatusBadge
                status={user.status}
                onClick={() => onToggleStatus(user.id)}
              />
            </td>
            <td className="py-2 px-4 border-b border-gray-700">
              <button className="p-1" onClick={() => onEdit(user)}>
                <MdOutlineModeEdit className="text-gray-500 hover:text-gray-300 cursor-pointer text-2xl border-none" />
              </button>
              <button className="p-1" onClick={() => onDelete(user)}>
                <MdDelete className="text-gray-500 hover:text-gray-300 cursor-pointer text-2xl border-none" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
