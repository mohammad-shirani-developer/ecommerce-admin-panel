import { UserSortKey } from "@/types/table";
import { User } from "@/types/user";

interface UsersTableProps {
  users: User[];
  sortBy: UserSortKey;
  sortDirection: "asc" | "desc";
  onSort: (key: UserSortKey) => void;
}

const UsersTable = ({
  users,
  sortBy,
  sortDirection,
  onSort,
}: UsersTableProps) => {
  return (
    <table className="w-full text-right border border-gray-700 text-sm">
      <thead className="bg-gray-800 text-gray-200">
        <tr>
          <th onClick={() => onSort("id")} className="cursor-pointer">
            ID {sortBy === "id" && (sortDirection === "asc" ? "▲" : "▼")}
          </th>
          <th onClick={() => onSort("name")} className="cursor-pointer">
            نام {sortBy === "name" && (sortDirection === "asc" ? "▲" : "▼")}
          </th>
          <th onClick={() => onSort("email")} className="cursor-pointer">
            ایمیل {sortBy === "email" && (sortDirection === "asc" ? "▲" : "▼")}
          </th>
          <th onClick={() => onSort("role")} className="cursor-pointer">
            نقش {sortBy === "role" && (sortDirection === "asc" ? "▲" : "▼")}
          </th>
          <th onClick={() => onSort("status")} className="cursor-pointer">
            وضعیت {sortBy === "status" && (sortDirection === "asc" ? "▲" : "▼")}
          </th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="border-t border-gray-700">
            <td className="p-2">{user.id}</td>
            <td className="p-2">{user.name}</td>
            <td className="p-2">{user.email}</td>
            <td className="p-2">{user.role}</td>
            <td className="p-2">{user.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
