"use client";

import { Product } from "@/types/product";
import { useEffect, useState } from "react";

interface EditProductFormProps {
  product: Product | null;
  onSave: (Product: Product) => void;
}

const EditProductForm = ({ product, onSave }: EditProductFormProps) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState<"active" | "inactive">("active");

  // وقتی product تغییر می‌کند (باز شدن modal)
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setStatus(product.status);
      setCategory(product.category);
    }
  }, [product]);

  if (!product) return null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSave({
      ...product,
      name,
      price,
      status,
      category,
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

      {/* قیمت */}
      <div>
        <label className="block text-sm mb-1">قیمت</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full rounded bg-gray-700 border border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* دسته‌بندی */}
      <div>
        <label className="block text-sm mb-1">دسته‌بندی</label>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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

export default EditProductForm;
