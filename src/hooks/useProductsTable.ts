"use client";

import { useMemo, useState } from "react";
import { toast } from "react-toastify";

import { productsDB as mockProducts } from "@/data/products";
import { CreateProductInput, Product } from "@/types/product";
import { ProductSortKey } from "@/types/table";
import { filterItems } from "@/utils/filterItems";
import { paginate } from "@/utils/paginate";
import { sortItems } from "@/utils/sortItems";

const PAGE_SIZE = 5;

export const useProductsTable = () => {
  // ===== table state =====
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<ProductSortKey>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

  // ===== modal state =====
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // ===== actions =====

  const toggleStatus = (productId: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? {
              ...p,
              status: p.status === "active" ? "inactive" : "active",
            }
          : p,
      ),
    );

    toast.info("وضعیت محصول تغییر کرد");
  };

  const handleSort = (key: ProductSortKey) => {
    setPage(1);

    if (sortBy === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
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

    toast.success("محصول با موفقیت ایجاد شد");
  };

  const handleEditProduct = (product: Product) => {
    setEditProduct(product);
    setIsEditModalOpen(true);
  };

  const handleSaveProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));

    setEditProduct(null);
    setIsEditModalOpen(false);

    toast.success("محصول با موفقیت ویرایش شد");
  };

  const handleDeleteProduct = (product: Product) => {
    setDeleteProduct(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteProduct = () => {
    if (!deleteProduct) return;

    setProducts((prev) => prev.filter((p) => p.id !== deleteProduct.id));

    setDeleteProduct(null);
    setIsDeleteModalOpen(false);

    toast.warn("محصول حذف شد");
  };

  // ===== derived data =====

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

  // ===== public api =====
  return {
    // data
    products: paginatedProducts,
    total: processedProducts.length,
    page,
    pageSize: PAGE_SIZE,
    search,
    sortBy,
    sortDirection,

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
    confirmDeleteProduct,
  };
};
