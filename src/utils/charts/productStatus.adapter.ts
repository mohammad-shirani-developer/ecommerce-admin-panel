import { Product } from "@/types/product";
import { ChartData } from "./charts.types";

export const adaptProductStatusToChart = (products: Product[]): ChartData[] => {
  const activeCount = products.filter((p) => p.status === "active").length;
  const inactiveCount = products.length - activeCount;

  return [
    { name: "فعال", value: activeCount },
    { name: "غیرفعال", value: inactiveCount },
  ];
};
