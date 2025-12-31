import { User } from "@/types/user";
import { useEffect, useState } from "react";

interface EditUserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

const EditUserModal = ({
  user,
  isOpen,
  onClose,
  onSave,
}: EditUserModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleSave = () => {
    onSave({ ...user, name, email });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-md w-96">
        <h2 className="text-lg font-bold mb-4">ویرایش کاربر</h2>
        <div className="flex flex-col gap-3 mb-4">
          <input
            className="p-2 rounded bg-gray-700 text-white"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="p-2 rounded bg-gray-700 text-white"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-500"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-3 py-1 bg-green-600 rounded hover:bg-green-500"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
