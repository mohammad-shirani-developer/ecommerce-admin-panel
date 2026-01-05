import { Product } from "@/types/product";
import { ChartData } from "./charts.types";

export const adaptProductsToSalesChart = (products: Product[]): ChartData[] => {
  return products.map((product) => ({
    name: product.name,
    value: product.price * (product.soldCount ?? 1),
  }));
};
