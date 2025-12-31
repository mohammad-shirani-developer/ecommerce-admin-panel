"use client";

import { CreateUserInput } from "@/types/user";
import { useState } from "react";

interface CreateUserFormProps {
  onCreate: (data: CreateUserInput) => void;
}

const CreateUserForm = ({ onCreate }: CreateUserFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) return;

    // const newUser: CreateUserInput = {
    //   name,
    //   email,
    //   status,
    // };

    onCreate({ name, email, status });

    // reset form
    setName("");
    setEmail("");
    setStatus("active");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-right">
      <div>
        <label className="block text-sm mb-1">نام</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded bg-gray-700 border border-gray-600 px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">ایمیل</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded bg-gray-700 border border-gray-600 px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">وضعیت</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as "active" | "inactive")}
          className="w-full rounded bg-gray-700 border border-gray-600 px-3 py-2"
        >
          <option value="active">فعال</option>
          <option value="inactive">غیرفعال</option>
        </select>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="px-4 py-2 rounded bg-green-600 hover:bg-green-500 cursor-pointer"
        >
          افزودن کاربر
        </button>
      </div>
    </form>
  );
};

export default CreateUserForm;
