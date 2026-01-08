import { productsApi } from "@/facke-db/products.api";
import { usersApi } from "@/facke-db/users.api";
import { DashboardApiResponse } from "@/types/api";

export const fetchDashboardData = async (): Promise<DashboardApiResponse> => {
  const [products, users] = await Promise.all([
    productsApi.getProducts(),
    usersApi.getUsers(),
  ]);

  return { products, users };
};
