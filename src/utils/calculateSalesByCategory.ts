import { Product, ProductCategory } from "@/types/product";

export interface CategorySales {
  category: ProductCategory;
  totalSales: number;
  totalSold: number;
}

export const calculateSalesByCategory = (
  products: Product[]
): CategorySales[] => {
  const map = new Map<ProductCategory, CategorySales>();

  products.forEach((product) => {
    const sales = product.price * product.soldCount!;

    if (!map.has(product.category as ProductCategory)) {
      map.set(product.category as ProductCategory, {
        category: product.category as ProductCategory,
        totalSales: 0,
        totalSold: 0,
      });
    }

    const current = map.get(product.category as ProductCategory)!;
    current.totalSales += sales;
    current.totalSold += product.soldCount!;
  });

  return Array.from(map.values());
};
