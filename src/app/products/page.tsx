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
  const table = useProductsTable();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">محصولات</h1>

      {table.total === 0 && <EmptyState message="هیچ محصولی یافت نشد." />}

      <ProductsToolbar
        searchValue={table.search}
        onSearchChange={(value) => {
          table.setSearch(value);
          table.setPage(1);
        }}
        setIsCreateModalOpen={table.setIsCreateModalOpen}
      />

      <ProductsTable
        products={table.products}
        onToggleStatus={table.toggleStatus}
        onEdit={table.handleEditProduct}
        onDelete={table.handleDeleteProduct}
        onSort={table.handleSort}
        sortBy={table.sortBy}
        sortDirection={table.sortDirection}
      />

      <Pagination
        total={table.total}
        pageSize={table.pageSize}
        currentPage={table.page}
        onPageChange={table.setPage}
      />

      {/* Edit Modal */}
      <FormModal
        isOpen={table.isEditModalOpen}
        title="ویرایش محصول"
        onClose={() => table.setIsEditModalOpen(false)}
      >
        <EditProductForm
          product={table.editProduct}
          onSave={table.handleSaveProduct}
        />
      </FormModal>

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={table.isDeleteModalOpen}
        title="حذف محصول"
        message={`آیا از حذف ${table.deleteProduct?.name} مطمئن هستید؟`}
        confirmText="حذف"
        onCancel={() => table.setIsDeleteModalOpen(false)}
        onConfirm={table.confirmDeleteProduct}
      />

      {/* Create Modal */}
      <FormModal
        isOpen={table.isCreateModalOpen}
        title="افزودن محصول"
        onClose={() => table.setIsCreateModalOpen(false)}
      >
        <CreateProductForm onCreate={table.handleCreateProduct} />
      </FormModal>
    </div>
  );
};

export default ProductsPage;
