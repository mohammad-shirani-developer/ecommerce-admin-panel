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
    // data
    products,
    total,
    page,
    pageSize,
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
  } = useProductsTable();

  if (loading) {
    return <div className="p-4">در حال بارگذاری...</div>;
  }

  if (error) {
    return <EmptyState message={error} />;
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">محصولات</h1>

      {/* Toolbar */}
      <ProductsToolbar
        searchValue={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />

      {/* Empty */}
      {products.length === 0 && <EmptyState message="هیچ محصولی یافت نشد." />}

      {/* Table */}
      {products.length > 0 && (
        <>
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
        </>
      )}

      {/* Edit Modal */}
      <FormModal
        isOpen={isEditModalOpen}
        title="ویرایش محصول"
        onClose={() => setIsEditModalOpen(false)}
      >
        {editProduct && (
          <EditProductForm product={editProduct} onSave={handleSaveProduct} />
        )}
      </FormModal>

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="حذف محصول"
        message={`آیا از حذف ${deleteProduct?.name} مطمئن هستید؟`}
        confirmText="حذف"
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
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
