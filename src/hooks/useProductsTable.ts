import { useDataTable } from "@/hooks/useDataTable";
import { productsService } from "@/services/productService";
import { CreateProductInput, Product } from "@/types/product";
import { ProductSortKey } from "@/types/table";
import { useEffect, useState } from "react";

export const useProductsTable = () => {
  // ===== state =====
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // ===== modal state =====
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // ===== fetch =====
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productsService.getAll();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ===== generic table =====
  const table = useDataTable<Product, ProductSortKey>({
    data: products,
    searchableKeys: ["name", "category", "status"],
    initialSortBy: "id",
    pageSize: 5,
  });

  // ===== CRUD =====
  const handleCreateProduct = async (data: CreateProductInput) => {
    try {
      setLoading(true);
      const newProduct = await productsService.create(data);
      setProducts((prev) => [newProduct, ...prev]);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Create product failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = async (updated: Product) => {
    try {
      setLoading(true);
      const product = await productsService.update(updated);
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? product : p)),
      );
    } catch (error) {
      console.error("Update product failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedProduct) return;

    try {
      setLoading(true);
      await productsService.remove(selectedProduct.id);
      setProducts((prev) => prev.filter((p) => p.id !== selectedProduct.id));
      setIsDeleteModalOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Delete product failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // ===== exposed =====
  return {
    ...table,

    products: table.data, // سازگاری با کامپوننت

    loading,

    isCreateModalOpen,
    setIsCreateModalOpen,

    isDeleteModalOpen,
    setIsDeleteModalOpen,

    selectedProduct,

    handleCreateProduct,
    handleEditProduct,
    handleDeleteProduct,
    confirmDelete,
  };
};
