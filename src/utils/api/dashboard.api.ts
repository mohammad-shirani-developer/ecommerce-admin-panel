import { DashboardApiResponse } from "@/types/api";
import { productsApi } from "./products.api";
import { usersApi } from "./users.api";

export const fetchDashboardData = async (): Promise<DashboardApiResponse> => {
  const [users, products] = await Promise.all([
    usersApi.fetchAll(),
    productsApi.fetchAll(),
  ]);

  return {
    users,
    products,
  };
};
