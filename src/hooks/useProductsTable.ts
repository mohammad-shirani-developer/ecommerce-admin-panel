import { productsDB as mockProducts } from "@/data/products";
import { CreateProductInput, Product } from "@/types/product";
import { ProductSortKey } from "@/types/table";
import { filterItems } from "@/utils/filterItems";
import { paginate } from "@/utils/paginate";
import { sortItems } from "@/utils/sortItems";
import { useEffect, useMemo, useState } from "react";

const PAGE_SIZE = 5;

export const useProductsTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<ProductSortKey>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // 🔹 simulate API call
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        await new Promise((res) => setTimeout(res, 800));
        setProducts(mockProducts);
      } catch {
        setError("خطا در دریافت محصولات");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ===== actions =====

  const toggleStatus = (id: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "active" ? "inactive" : "active" }
          : p,
      ),
    );
  };

  const handleSort = (key: ProductSortKey) => {
    setPage(1);
    if (sortBy === key) {
      setSortDirection((p) => (p === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDirection("asc");
    }
  };

  const handleCreateProduct = (data: CreateProductInput) => {
    const nextId =
      products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;

    setProducts((prev) => [{ id: nextId, ...data }, ...prev]);
    setIsCreateModalOpen(false);
  };

  const handleEditProduct = (product: Product) => {
    setEditProduct(product);
    setIsEditModalOpen(true);
  };

  const handleSaveProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setIsEditModalOpen(false);
    setEditProduct(null);
  };

  const handleDeleteProduct = (product: Product) => {
    setDeleteProduct(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (!deleteProduct) return;
    setProducts((prev) => prev.filter((p) => p.id !== deleteProduct.id));
    setIsDeleteModalOpen(false);
    setDeleteProduct(null);
  };

  // ===== derived =====

  const processedProducts = useMemo(() => {
    const filtered = filterItems(products, search, [
      "name",
      "category",
      "status",
    ]);
    return sortItems(filtered, sortBy, sortDirection);
  }, [products, search, sortBy, sortDirection]);

  const paginatedProducts = useMemo(
    () => paginate(processedProducts, page, PAGE_SIZE),
    [processedProducts, page],
  );

  return {
    // data
    products: paginatedProducts,
    total: processedProducts.length,
    page,
    pageSize: PAGE_SIZE,
    search,
    sortBy,
    sortDirection,
    loading,
    error,

    // modal state
    editProduct,
    deleteProduct,
    isEditModalOpen,
    isDeleteModalOpen,
    isCreateModalOpen,

    // setters
    setSearch,
    setPage,
    setIsCreateModalOpen,
    setIsEditModalOpen,
    setIsDeleteModalOpen,

    // actions
    toggleStatus,
    handleSort,
    handleCreateProduct,
    handleEditProduct,
    handleSaveProduct,
    handleDeleteProduct,
    confirmDelete,
  };
};
