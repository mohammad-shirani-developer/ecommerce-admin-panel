import { Product } from "@/types/product";
import { useEffect, useState } from "react";

interface EditProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProduct: Product) => void;
}

const EditProductModal = ({
  product,
  isOpen,
  onClose,
  onSave,
}: EditProductModalProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setCategory(product.category);
    }
  }, [product]);

  if (!isOpen || !product) return null;
  const handleSave = () => {
    onSave({ ...product, name, price, category });
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
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <input
            className="p-2 rounded bg-gray-700 text-white"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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

export default EditProductModal;
