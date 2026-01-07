import { DashboardApiResponse } from "@/types/api";
import { fetchProducts } from "./products.api";
import { fetchUsers } from "./users.api";

export const fetchDashboardData = async (): Promise<DashboardApiResponse> => {
  const [products, users] = await Promise.all([fetchProducts(), fetchUsers()]);

  return { products, users };
};
