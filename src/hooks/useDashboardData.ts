import { ERROR_MESSAGES } from "@/constants/error";
import { Product } from "@/types/product";
import { User } from "@/types/user";
import { fetchDashboardData } from "@/utils/api/dashboard.api";
import { useEffect, useState } from "react";

export const useDashboardData = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData()
      .then(({ products, users }) => {
        setProducts(products);
        setUsers(users);
      })
      .catch(() => {
        setError(ERROR_MESSAGES.DASHBOARD_LOAD);
      })
      .finally(() => setLoading(false));
  }, []);

  return { products, users, loading, error };
};
