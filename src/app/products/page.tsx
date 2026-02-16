"use client";

import ConfirmModal from "@/components/common/ConfirmModal";
import DataTable, { Column } from "@/components/common/DataTable";
import FormModal from "@/components/common/FormModal";
import Pagination from "@/components/common/Pagination";
import EmptyState from "@/components/EmptyState";

import CreateProductForm from "@/components/products/CreateProductForm";
import EditProductForm from "@/components/products/EditProductForm";
import ProductStatusBadge from "@/components/products/ProductStatusBadge";
import ProductsToolbar from "@/components/products/ProductsToolbar";

import { useProductsTable } from "@/hooks/useProductsTable";
import { Product } from "@/types/product";
import { ProductSortKey } from "@/types/table";
import { MdDelete, MdOutlineModeEdit } from "react-icons/md";

const ProductsPage = () => {
  const {
    products,
    total,
    page,
    pageSize,
    search,
    sortBy,
    sortDirection,

    editProduct,
    deleteProduct,
    isEditModalOpen,
    isDeleteModalOpen,
    isCreateModalOpen,

    setSearch,
    setPage,
    setIsCreateModalOpen,
    setIsEditModalOpen,
    setIsDeleteModalOpen,

    toggleStatus,
    handleSort,
    handleCreateProduct,
    handleEditProduct,
    handleSaveProduct,
    handleDeleteProduct,
    confirmDeleteProduct,
  } = useProductsTable();

  const columns: Column<Product, ProductSortKey>[] = [
    { key: "id", label: "ID", sortable: true },
    { key: "name", label: "نام", sortable: true },
    { key: "price", label: "قیمت", sortable: true },
    { key: "category", label: "دسته‌بندی", sortable: true },
    {
      key: "status",
      label: "وضعیت",
      sortable: true,
      render: (product) => (
        <ProductStatusBadge
          status={product.status}
          onClick={() => toggleStatus(product.id)}
        />
      ),
    },
    {
      key: "id",
      label: "عملیات",
      render: (product) => (
        <div className="flex gap-2">
          <button onClick={() => handleEditProduct(product)}>
            <MdOutlineModeEdit className="text-xl text-gray-400 hover:text-white" />
          </button>
          <button onClick={() => handleDeleteProduct(product)}>
            <MdDelete className="text-xl text-gray-400 hover:text-red-500" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">محصولات</h1>

      <ProductsToolbar
        searchValue={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />

      {products.length === 0 ? (
        <EmptyState message="هیچ محصولی یافت نشد." />
      ) : (
        <>
          <DataTable<Product, ProductSortKey>
            data={products}
            columns={columns}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSort={handleSort}
          />

          <Pagination
            total={total}
            pageSize={pageSize}
            currentPage={page}
            onPageChange={setPage}
          />
        </>
      )}

      {/* Edit */}
      <FormModal
        isOpen={isEditModalOpen}
        title="ویرایش محصول"
        onClose={() => setIsEditModalOpen(false)}
      >
        <EditProductForm product={editProduct} onSave={handleSaveProduct} />
      </FormModal>

      {/* Delete */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="حذف محصول"
        message={`آیا از حذف ${deleteProduct?.name} مطمئن هستید؟`}
        confirmText="حذف"
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteProduct}
      />

      {/* Create */}
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
