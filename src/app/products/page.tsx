"use client";
import ConfirmModal from "@/components/common/ConfirmModal";
import FormModal from "@/components/common/FormModal";
import Pagination from "@/components/common/Pagination";
import CreateProductForm from "@/components/products/CreateProductForm";
import EditProductForm from "@/components/products/EditProductForm";
import ProductsToolbar from "@/components/products/ProductsToolbar";
import ProductsTable from "@/components/products/ProductTable";
import { productsDB as mockProducts } from "@/data/products";
import { CreateProductInput, Product } from "@/types/product";
import { filterItems } from "@/utils/filterItems";
import { paginate } from "@/utils/paginate";
import { sortItems } from "@/utils/sortItems";
import { useMemo, useState } from "react";

const PAGE_SIZE = 5;

const ProductsPage = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [sortBy, setSortBy] = useState<keyof Product>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleStatusClick = (productId: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? {
              ...product,
              status: product.status === "active" ? "inactive" : "active",
            }
          : product
      )
    );
  };

  const processedProducts = useMemo(() => {
    const filtered = filterItems(products, search, [
      "name",
      "category",
      "status",
    ]);
    const sorted = sortItems(filtered, sortBy, sortDirection);
    return sorted;
  }, [products, search, sortBy, sortDirection]);

  const paginatedProducts = useMemo(
    () => paginate(processedProducts, page, PAGE_SIZE),
    [processedProducts, page]
  );

  const handleEditProduct = (product: Product) => {
    setEditProduct(product);
    setIsModalOpen(true);
  };
  const handleDeleteProduct = (product: Product) => {
    setDeleteProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleSaveProduct = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setEditProduct(null);
    setIsModalOpen(false);
  };
  const handleDeletedUser = (updatedUser: Product) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== updatedUser.id)
    );
    setDeleteProduct(null);
    setIsDeleteModalOpen(false);
  };

  const handleCloseModal = () => {
    setEditProduct(null);
    setIsModalOpen(false);
  };
  const handleCloseDeleteModal = () => {
    setDeleteProduct(null);
    setIsDeleteModalOpen(false);
  };

  const handleSort = (key: keyof Product) => {
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
      products.length > 0 ? Math.max(...products.map((u) => u.id)) + 1 : 1;

    setProducts((prev) => [
      {
        id: nextId,
        ...data,
      },
      ...prev,
    ]);

    setIsCreateModalOpen(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">محصولات</h1>
      <ProductsToolbar
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />
      <ProductsTable
        products={paginatedProducts}
        onToggleStatus={handleStatusClick}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
        onSort={handleSort}
        sortBy={sortBy}
        sortDirection={sortDirection}
      />
      <Pagination
        total={processedProducts.length}
        pageSize={PAGE_SIZE}
        currentPage={page}
        onPageChange={setPage}
      />
      <FormModal
        isOpen={isModalOpen}
        title="ویرایش محصول"
        onClose={handleCloseModal}
      >
        <EditProductForm product={editProduct} onSave={handleSaveProduct} />
      </FormModal>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="حذف محصول"
        message={`آیا از حذف ${deleteProduct?.name} مطمئن هستید؟`}
        confirmText="حذف"
        onCancel={handleCloseDeleteModal}
        onConfirm={() => handleDeletedUser(deleteProduct!)}
      />
      <FormModal
        isOpen={isCreateModalOpen}
        title="افزودن محصول"
        onClose={() => setIsCreateModalOpen(false)}
      >
        <CreateProductForm onCreate={handleCreateProduct} />
      </FormModal>
    </div>
  );
};

export default ProductsPage;
