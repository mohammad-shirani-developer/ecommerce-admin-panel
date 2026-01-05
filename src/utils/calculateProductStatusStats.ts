import { Product } from "@/types/product";

export interface ProductStatusStat {
  name: string;
  value: number;
}

export const calculateProductStatusStats = (
  products: Product[]
): ProductStatusStat[] => {
  const activeCount = products.filter((p) => p.status === "active").length;

  const inactiveCount = products.length - activeCount;

  return [
    { name: "فعال", value: activeCount },
    { name: "غیرفعال", value: inactiveCount },
  ];
};
