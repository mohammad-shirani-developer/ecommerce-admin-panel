"use client";

import { User } from "@/types/user";
import { useEffect, useState } from "react";

interface EditUserFormProps {
  user: User | null;
  onSave: (user: User) => void;
}

const EditUserForm = ({ user, onSave }: EditUserFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");

  // وقتی user تغییر می‌کند (باز شدن modal)
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setStatus(user.status);
    }
  }, [user]);

  if (!user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSave({
      ...user,
      name,
      email,
      status,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-right">
      {/* نام */}
      <div>
        <label className="block text-sm mb-1">نام</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded bg-gray-700 border border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* ایمیل */}
      <div>
        <label className="block text-sm mb-1">ایمیل</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded bg-gray-700 border border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* وضعیت */}
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

      {/* دکمه‌ها */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500"
        >
          ذخیره
        </button>
      </div>
    </form>
  );
};

export default EditUserForm;
