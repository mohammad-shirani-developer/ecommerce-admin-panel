"use client";
import ProductSalesBarChart from "@/components/dashboard/ProductSalesBarChart";
import ProductStatusPieChart from "@/components/dashboard/ProductStatusPieChart";
import { calculateProductStatusStats } from "@/utils/calculateProductStatusStats";
import { calculateSalesByCategory } from "@/utils/calculateSalesByCategory";
import { getDashboardStats } from "@/utils/dashboardData";
import { generateProducts } from "@/utils/generateProducts";
import { generateUsers } from "@/utils/generateUsers";
import StatsGrid from "./StatsGrid";

const DashboardPage = () => {
  const users = generateUsers(20);
  const products = generateProducts(15);
  const salesData = calculateSalesByCategory(products);
  const stats = getDashboardStats(users, products);
  const statusData = calculateProductStatusStats(products);
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
