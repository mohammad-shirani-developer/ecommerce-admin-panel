import { Product } from "@/types/product";
import { MdDelete, MdOutlineModeEdit } from "react-icons/md";
import UserStatusBadge from "./ProductStatusBadge";

interface ProductsTableProps {
  products: Product[];
  onToggleStatus: (productId: number) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onSort: (key: keyof Product) => void;
  sortBy: keyof Product;
  sortDirection: "asc" | "desc";
}

const ProductsTable = ({
  products,
  onToggleStatus,
  onEdit,
  onDelete,
  onSort,
  sortBy,
  sortDirection,
}: ProductsTableProps) => {
  return (
    <table className="w-full text-right table-auto border border-gray-700 text-sm">
      <thead className="bg-gray-800 text-gray-200">
        <tr className="bg-gray-800">
          <th
            onClick={() => onSort("id")}
            className="cursor-pointer select-none"
          >
            ID {sortBy === "id" && (sortDirection === "asc" ? "▲" : "▼")}
          </th>
          <th
            onClick={() => onSort("name")}
            className="cursor-pointer select-none"
          >
            نام {sortBy === "name" && (sortDirection === "asc" ? "▲" : "▼")}
          </th>
          <th
            onClick={() => onSort("price")}
            className="cursor-pointer select-none"
          >
            قیمت {sortBy === "price" && (sortDirection === "asc" ? "▲" : "▼")}
          </th>

          <th
            onClick={() => onSort("category")}
            className="cursor-pointer select-none"
          >
            دسته‌بندی
            {sortBy === "category" && (sortDirection === "asc" ? "▲" : "▼")}
          </th>

          <th
            onClick={() => onSort("status")}
            className="cursor-pointer select-none"
          >
            وضعیت {sortBy === "status" && (sortDirection === "asc" ? "▲" : "▼")}
          </th>

          <th className="py-2 px-4 border-b border-gray-700">عملیات</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} className="hover:bg-gray-700 transition-colors">
            <td className="py-2 px-4 border-b border-gray-700">{product.id}</td>
            <td className="py-2 px-4 border-b border-gray-700">
              {product.name}
            </td>
            <td className="py-2 px-4 border-b border-gray-700">
              {product.price}
            </td>
            <td className="py-2 px-4 border-b border-gray-700">
              {product.category}
            </td>
            <td className="py-2 px-4 border-b border-gray-700">
              <UserStatusBadge
                status={product.status}
                onClick={() => onToggleStatus(product.id)}
              />
            </td>
            <td className="py-2 px-4 border-b border-gray-700">
              <button className="p-1" onClick={() => onEdit(product)}>
                <MdOutlineModeEdit className="text-gray-500 hover:text-gray-300 cursor-pointer text-2xl border-none" />
              </button>
              <button className="p-1" onClick={() => onDelete(product)}>
                <MdDelete className="text-gray-500 hover:text-gray-300 cursor-pointer text-2xl border-none" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductsTable;
