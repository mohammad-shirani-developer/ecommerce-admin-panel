import { useCrudTable } from "@/hooks/useCrudTable";
import { productsService } from "@/services/productsService";
import { CreateProductInput, Product } from "@/types/product";
import { ProductSortKey } from "@/types/table";

export const useProductsTable = () =>
  useCrudTable<Product, CreateProductInput, ProductSortKey>({
    service: productsService,
    searchableKeys: ["name", "category", "status"],
    initialSortBy: "id",
    pageSize: 5,
  });
