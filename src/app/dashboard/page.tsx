"use client";

import ProductSalesBarChart from "@/components/charts/ProductSalesBarChart";
import ProductStatusPieChart from "@/components/charts/ProductStatusPieChart";
import StatsGrid from "@/components/dashboard/StatsGrid";
import { Product } from "@/types/product";
import { User } from "@/types/user";
import { fetchDashboardData } from "@/utils/auth/api/dashboard.api";
import { adaptProductStatusToChart } from "@/utils/charts/productStatus.adapter";
import { adaptProductsToSalesChart } from "@/utils/charts/salesBar.adapter";
import { getDashboardStats } from "@/utils/dashboardData";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const stats = getDashboardStats(users, products);
  const statusData = adaptProductStatusToChart(products);
  const salesData = adaptProductsToSalesChart(products);

  useEffect(() => {
    fetchDashboardData()
      .then(({ products, users }) => {
        setProducts(products);
        setUsers(users);
      })
      .catch(() => {
        setError("خطا در بارگذاری داده‌های داشبورد");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center">در حال بارگذاری...</div>;
  }
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">داشبورد</h2>
        <StatsGrid stats={stats} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProductSalesBarChart data={salesData} />
          <ProductStatusPieChart data={statusData} />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
