import { User } from "@/types/user";

interface DeleteUserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (updatedUser: User) => void;
}

const DeleteUserModal = ({
  user,
  isOpen,
  onClose,
  onDelete,
}: DeleteUserModalProps) => {
  if (!isOpen || !user) return null;

  const handleSave = () => {
    onDelete(user);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-md w-96">
        <h2 className="text-lg font-bold mb-4">حذف کاربر</h2>
        <div className="flex flex-col gap-3 mb-4">
          <p>آیا از حذف کاربر {user.name} مطمئن هستید؟</p>
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-500"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-3 py-1 bg-red-600 rounded hover:bg-red-500"
            onClick={handleSave}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
