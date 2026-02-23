import { useDataTable } from "@/hooks/useDataTable";
import { productsService } from "@/services/productsService";
import { CreateProductInput, Product, ProductStatus } from "@/types/product";
import { ProductSortKey } from "@/types/table";
import { useEffect, useState } from "react";

export const useProductsTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productsService.getAll();
      setProducts(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const table = useDataTable<Product, ProductSortKey>({
    data: products,
    searchableKeys: ["name", "category", "status"],
    initialSortBy: "id",
    pageSize: 5,
  });

  // ===== CRUD =====

  const handleCreateProduct = async (data: CreateProductInput) => {
    const newProduct = await productsService.create(data);
    setProducts((prev) => [newProduct, ...prev]);
    setIsCreateModalOpen(false);
  };

  const handleEditProduct = (product: Product) => {
    setEditProduct(product);
    setIsEditModalOpen(true);
  };

  const handleSaveProduct = async (updated: Product) => {
    const result = await productsService.update(updated);
    setProducts((prev) => prev.map((p) => (p.id === result.id ? result : p)));
    setIsEditModalOpen(false);
    setEditProduct(null);
  };

  const handleDeleteProduct = (product: Product) => {
    setDeleteProduct(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteProduct = async () => {
    if (!deleteProduct) return;
    await productsService.remove(deleteProduct.id);
    setProducts((prev) => prev.filter((p) => p.id !== deleteProduct.id));
    setIsDeleteModalOpen(false);
    setDeleteProduct(null);
  };

  const toggleProductStatus = (status: ProductStatus): ProductStatus =>
    status === "active" ? "inactive" : "active";

  const toggleStatus = async (id: number) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    const updated = {
      ...product,
      status: toggleProductStatus(product.status),
    };

    await productsService.update(updated);

    setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
  };

  return {
    // table
    products: table.data,
    total: table.total,
    page: table.page,
    pageSize: table.pageSize,
    search: table.search,
    sortBy: table.sortBy,
    sortDirection: table.sortDirection,
    setSearch: table.setSearch,
    setPage: table.setPage,
    handleSort: table.handleSort,

    // modals
    isCreateModalOpen,
    setIsCreateModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,

    // selected items
    editProduct,
    deleteProduct,

    // handlers
    toggleStatus,
    handleCreateProduct,
    handleEditProduct,
    handleSaveProduct,
    handleDeleteProduct,
    confirmDeleteProduct,
    loading,
  };
};
