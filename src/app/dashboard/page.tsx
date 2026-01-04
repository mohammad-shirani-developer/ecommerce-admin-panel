"use client";
import { productsDB } from "@/data/products";
import { users } from "@/data/users";
import { getDashboardStats } from "@/utils/dashboardData";
import StatsGrid from "./StatsGrid";

const DashboardPage = () => {
  const stats = getDashboardStats(users, productsDB);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">داشبورد</h2>
      <StatsGrid stats={stats} />
    </>
  );
};

export default DashboardPage;
