"use client";

import { CreateUserInput } from "@/types/user";
import CreateUserForm from "./CreateUserForm";

interface CreateUserModalProps {
  onClose: () => void;
  onCreate: (data: CreateUserInput) => void;
}

const CreateUserModal = ({ onClose, onCreate }: CreateUserModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 left-3 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-lg font-bold mb-4 text-right">افزودن کاربر جدید</h2>

        <CreateUserForm
          onCreate={(data) => {
            onCreate(data);
            onClose();
          }}
        />
      </div>
    </div>
  );
};

export default CreateUserModal;
