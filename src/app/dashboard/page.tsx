"use client";

import ProductSalesBarChart from "@/components/charts/ProductSalesBarChart";
import ProductStatusPieChart from "@/components/charts/ProductStatusPieChart";
import { adaptProductStatusToChart } from "@/utils/charts/productStatus.adapter";
import { adaptProductsToSalesChart } from "@/utils/charts/salesBar.adapter";
import { getDashboardStats } from "@/utils/dashboardData";
import { generateProducts } from "@/utils/generateProducts";
import { generateUsers } from "@/utils/generateUsers";
import StatsGrid from "./StatsGrid";

const DashboardPage = () => {
  const users = generateUsers(20);
  const products = generateProducts(15);
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
