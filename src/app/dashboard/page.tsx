"use client";
import { getDashboardStats } from "@/utils/dashboardData";
import { generateProducts } from "@/utils/generateProducts";
import { generateUsers } from "@/utils/generateUsers";
import StatsGrid from "./StatsGrid";

const DashboardPage = () => {
  const users = generateUsers(20);
  const products = generateProducts(15);
  const stats = getDashboardStats(users, products);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">داشبورد</h2>
      <StatsGrid stats={stats} />
    </>
  );
};

export default DashboardPage;
