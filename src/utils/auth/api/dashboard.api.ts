import { fetchProducts } from "./products.api";
import { fetchUsers } from "./users.api";

export const fetchDashboardData = async () => {
  const [products, users] = await Promise.all([fetchProducts(), fetchUsers()]);

  return { products, users };
};
