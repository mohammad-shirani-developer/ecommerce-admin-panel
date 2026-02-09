"use client";

import ConfirmModal from "@/components/common/ConfirmModal";
import FormModal from "@/components/common/FormModal";
import Pagination from "@/components/common/Pagination";
import EmptyState from "@/components/EmptyState";

import CreateProductForm from "@/components/products/CreateProductForm";
import EditProductForm from "@/components/products/EditProductForm";
import ProductsToolbar from "@/components/products/ProductsToolbar";
import ProductsTable from "@/components/products/ProductTable";

import { productsDB } from "@/data/products";
import { useProductsTable } from "@/hooks/useProductsTable";

const ProductsPage = () => {
  const table = useProductsTable(productsDB);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">محصولات</h1>

      {table.total === 0 && <EmptyState message="هیچ محصولی یافت نشد" />}

      {/* Toolbar */}
      <ProductsToolbar
        searchValue={table.search}
        onSearchChange={(value) => {
          table.setSearch(value);
          table.setPage(1);
        }}
        setIsCreateModalOpen={table.setIsCreateModalOpen}
      />

      {/* Table */}
      <ProductsTable
        products={table.products}
        sortBy={table.sortBy}
        sortDirection={table.sortDirection}
        onSort={table.sort}
        onToggleStatus={table.toggleStatus}
        onEdit={table.startEdit}
        onDelete={table.startDelete}
      />

      {/* Pagination */}
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
        <EditProductForm product={table.editProduct} onSave={table.saveEdit} />
      </FormModal>

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={table.isDeleteModalOpen}
        title="حذف محصول"
        message={`آیا از حذف «${table.deleteProduct?.name}» مطمئن هستید؟`}
        confirmText="حذف"
        onCancel={() => table.setIsDeleteModalOpen(false)}
        onConfirm={table.confirmDelete}
      />

      {/* Create Modal */}
      <FormModal
        isOpen={table.isCreateModalOpen}
        title="افزودن محصول"
        onClose={() => table.setIsCreateModalOpen(false)}
      >
        <CreateProductForm onCreate={table.createProduct} />
      </FormModal>
    </div>
  );
};

export default ProductsPage;
