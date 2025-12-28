import { User } from "@/types/user";
import UserStatusBadge from "./UserStatusBadge";

interface UsersTableProps {
  users: User[];
}

const UsersTable = ({ users }: UsersTableProps) => {
  return (
    <table className="w-full text-right table-auto border border-gray-700 text-sm">
      <thead className="bg-gray-800 text-gray-200">
        <tr className="bg-gray-800">
          <th className="py-2 px-4 border-b border-gray-700">ID</th>
          <th className="py-2 px-4 border-b border-gray-700">نام</th>
          <th className="py-2 px-4 border-b border-gray-700">ایمیل</th>
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
              <UserStatusBadge status={user.status} />
            </td>
            <td className="py-2 px-4 border-b border-gray-700 text-left">
              {/* future actions */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
