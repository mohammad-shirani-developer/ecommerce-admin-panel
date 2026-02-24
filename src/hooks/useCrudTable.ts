import { useDataTable } from "@/hooks/useDataTable";
import { useEffect, useState } from "react";

//
// Service Contract
//
interface CrudService<T extends { id: number | string }, CreateInput> {
  getAll: () => Promise<T[]>;
  create: (data: CreateInput) => Promise<T>;
  update: (data: T) => Promise<T>;
  remove: (id: T["id"]) => Promise<void>;
}

//
// Hook Props
//
interface UseCrudTableProps<
  T extends { id: number | string },
  CreateInput,
  SortKey extends keyof T,
> {
  service: CrudService<T, CreateInput>;
  searchableKeys: (keyof T)[];
  initialSortBy: SortKey;
  pageSize?: number;
}

//
// Hook
//
export function useCrudTable<
  T extends { id: number | string },
  CreateInput,
  SortKey extends keyof T,
>({
  service,
  searchableKeys,
  initialSortBy,
  pageSize = 5,
}: UseCrudTableProps<T, CreateInput, SortKey>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  // modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [editItem, setEditItem] = useState<T | null>(null);
  const [deleteItem, setDeleteItem] = useState<T | null>(null);

  //
  // Fetch
  //
  const fetchAll = async () => {
    setLoading(true);
    try {
      const data = await service.getAll();
      setItems(data);
      console.log("Fetched:", data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //
  // DataTable Integration
  //
  const table = useDataTable<T, SortKey>({
    data: items,
    searchableKeys,
    initialSortBy,
    pageSize,
  });
  console.log("Items state:", items);
  console.log("Table data:", table.data);

  //
  // CRUD Handlers
  //
  const handleCreate = async (data: CreateInput) => {
    const newItem = await service.create(data);
    setItems((prev) => [newItem, ...prev]);
    setIsCreateModalOpen(false);
  };

  const handleEdit = (item: T) => {
    setEditItem(item);
    setIsEditModalOpen(true);
  };

  const handleSave = async (updated: T) => {
    const result = await service.update(updated);

    setItems((prev) =>
      prev.map((item) => (item.id === result.id ? result : item)),
    );

    setIsEditModalOpen(false);
    setEditItem(null);
  };

  const handleDelete = (item: T) => {
    setDeleteItem(item);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteItem) return;

    await service.remove(deleteItem.id);

    setItems((prev) => prev.filter((item) => item.id !== deleteItem.id));

    setIsDeleteModalOpen(false);
    setDeleteItem(null);
  };

  //
  // Return API
  //
  return {
    // table data
    data: table.data,
    total: table.total,
    page: table.page,
    pageSize: table.pageSize,
    search: table.search,
    sortBy: table.sortBy,
    sortDirection: table.sortDirection,
    setSearch: table.setSearch,
    setPage: table.setPage,
    handleSort: table.handleSort,

    // loading
    loading,

    // modal controls
    isCreateModalOpen,
    setIsCreateModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,

    // selected items
    editItem,
    deleteItem,

    // handlers
    handleCreate,
    handleEdit,
    handleSave,
    handleDelete,
    confirmDelete,
  };
}
