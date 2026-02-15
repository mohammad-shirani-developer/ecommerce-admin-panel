"use client";

import ConfirmModal from "@/components/common/ConfirmModal";
import FormModal from "@/components/common/FormModal";
import Pagination from "@/components/common/Pagination";
import EmptyState from "@/components/EmptyState";

import CreateProductForm from "@/components/products/CreateProductForm";
import EditProductForm from "@/components/products/EditProductForm";
import ProductsToolbar from "@/components/products/ProductsToolbar";
import ProductsTable from "@/components/products/ProductTable";

import { useProductsTable } from "@/hooks/useProductsTable";

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

      {products.length === 0 && <EmptyState message="هیچ محصولی یافت نشد." />}

      <ProductsTable
        products={products}
        onToggleStatus={toggleStatus}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
        onSort={handleSort}
        sortBy={sortBy}
        sortDirection={sortDirection}
      />

      <Pagination
        total={total}
        pageSize={pageSize}
        currentPage={page}
        onPageChange={setPage}
      />

      {/* Edit Modal */}
      <FormModal
        isOpen={isEditModalOpen}
        title="ویرایش محصول"
        onClose={() => setIsEditModalOpen(false)}
      >
        <EditProductForm product={editProduct} onSave={handleSaveProduct} />
      </FormModal>

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="حذف محصول"
        message={`آیا از حذف ${deleteProduct?.name} مطمئن هستید؟`}
        confirmText="حذف"
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteProduct}
      />

      {/* Create Modal */}
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
