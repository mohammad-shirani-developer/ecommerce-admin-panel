"use client";

import { User } from "@/types/user";

interface DeleteUserModalProps {
  user: User;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

const DeleteUserModal = ({
  user,
  onClose,
  onConfirm,
  loading = false,
}: DeleteUserModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg w-full max-w-md p-6 relative text-right">
        <h2 className="text-lg font-bold mb-4">حذف کاربر</h2>

        <p className="text-gray-300 mb-6">
          آیا از حذف کاربر
          <span className="font-semibold text-white mx-1">{user.name}</span>
          مطمئن هستید؟
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 disabled:opacity-50"
          >
            لغو
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-500 disabled:opacity-50"
          >
            {loading ? "در حال حذف..." : "حذف"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
