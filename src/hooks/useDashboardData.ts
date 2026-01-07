import { Product } from "@/types/product";
import { User } from "@/types/user";
import { fetchDashboardData } from "@/utils/auth/api/dashboard.api";
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
        setError("خطا در دریافت اطلاعات داشبورد");
      })
      .finally(() => setLoading(false));
  }, []);

  return { products, users, loading, error };
};
