"use client";

import { CreateProductInput } from "@/types/product";
import { useState } from "react";

interface CreateProductFormProps {
  onCreate: (data: CreateProductInput) => void;
}

const CreateProductForm = ({ onCreate }: CreateProductFormProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !price) return;

    // const newUser: CreateUserInput = {
    //   name,
    //   email,
    //   status,
    // };

    onCreate({ name, price, status, category });

    // reset form
    setName("");
    setPrice(0);
    setCategory("");
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
        <label className="block text-sm mb-1">قیمت</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full rounded bg-gray-700 border border-gray-600 px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">دسته‌بندی</label>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
          افزودن محصول
        </button>
      </div>
    </form>
  );
};

export default CreateProductForm;
