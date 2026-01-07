"use client";

import ProductSalesBarChart from "@/components/charts/ProductSalesBarChart";
import ProductStatusPieChart from "@/components/charts/ProductStatusPieChart";
import StatsGrid from "@/components/dashboard/StatsGrid";
import { useDashboardData } from "@/hooks/useDashboardData";
import { adaptProductStatusToChart } from "@/utils/charts/productStatus.adapter";
import { adaptProductsToSalesChart } from "@/utils/charts/salesBar.adapter";
import { getDashboardStats } from "@/utils/dashboardData";

const DashboardPage = () => {
  const { products, users, loading, error } = useDashboardData();

  if (loading) return <div>در حال بارگذاری...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const stats = getDashboardStats(users, products);
  const statusData = adaptProductStatusToChart(products);
  const salesData = adaptProductsToSalesChart(products);

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
