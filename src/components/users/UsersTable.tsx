import { User } from "@/types/user";
import { MdDelete, MdOutlineModeEdit } from "react-icons/md";
import UserStatusBadge from "./UserStatusBadge";

interface UsersTableProps {
  users: User[];
  onToggleStatus: (userId: number) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const UsersTable = ({
  users,
  onToggleStatus,
  onEdit,
  onDelete,
}: UsersTableProps) => {
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
