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
      .catch((err) => {
        if (err instanceof Error) {
          setError(err.message); // Error message from the API
        } else {
          setError(ERROR_MESSAGES.DASHBOARD_LOAD); // Default error message
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return { products, users, loading, error };
};
