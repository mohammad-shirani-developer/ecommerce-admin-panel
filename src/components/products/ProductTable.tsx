import { Product } from "@/types/product";
import { ProductSortKey } from "@/types/table";
import { MdDelete, MdOutlineModeEdit } from "react-icons/md";
import Table from "../common/table";
import ProductStatusBadge from "./ProductStatusBadge";

interface ProductsTableProps {
  products: Product[];
  sortBy: ProductSortKey;
  sortDirection: "asc" | "desc";
  onSort: (key: ProductSortKey) => void;
  onToggleStatus: (id: number) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const columns = [
  { key: "id", label: "ID", sortable: true },
  { key: "name", label: "نام", sortable: true },
  { key: "price", label: "قیمت", sortable: true },
  { key: "category", label: "دسته‌بندی", sortable: true },
  { key: "status", label: "وضعیت", sortable: true },
] as const;

const ProductsTable = ({
  products,
  sortBy,
  sortDirection,
  onSort,
  onToggleStatus,
  onEdit,
  onDelete,
}: ProductsTableProps) => {
  return (
    <Table<Product, ProductSortKey>
      data={products}
      columns={columns}
      sortBy={sortBy}
      sortDirection={sortDirection}
      onSort={onSort}
      renderRow={(product) => (
        <tr key={product.id} className="hover:bg-gray-700">
          <td>{product.id}</td>
          <td>{product.name}</td>
          <td>{product.price}</td>
          <td>{product.category}</td>
          <td>
            <ProductStatusBadge
              status={product.status}
              onClick={() => onToggleStatus(product.id)}
            />
          </td>
          <td className="flex gap-2">
            <button onClick={() => onEdit(product)}>
              <MdOutlineModeEdit />
            </button>
            <button onClick={() => onDelete(product)}>
              <MdDelete />
            </button>
          </td>
        </tr>
      )}
    />
  );
};

export default ProductsTable;
