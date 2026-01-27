"use client";

import ProductSalesBarChart from "@/components/charts/ProductSalesBarChart";
import ProductStatusPieChart from "@/components/charts/ProductStatusPieChart";
import ToastContent from "@/components/common/ToastContent";
import StatsGrid from "@/components/dashboard/StatsGrid";
import EmptyState from "@/components/EmptyState";
import AdminGuard from "@/components/guards/AdminGuard";
import SkeletonLoader from "@/components/SkeletonLoader";
import { useDashboardData } from "@/hooks/useDashboardData";
import { adaptProductStatusToChart } from "@/utils/charts/productStatus.adapter";
import { adaptProductsToSalesChart } from "@/utils/charts/salesBar.adapter";
import { getDashboardStats } from "@/utils/dashboardData";
import { useEffect } from "react";
import { toast } from "react-toastify";

const DashboardPage = () => {
  const { products, users, loading, error } = useDashboardData();

  useEffect(() => {
    if (error) {
      toast.error(
        <ToastContent title="خطا" message="مشکلی در دریافت اطلاعات پیش آمده" />,
        {
          className: "bg-red-600 text-white",
        },
      );
    }
  }, [error]);

  if (loading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        خطا در دریافت اطلاعات داشبورد
      </div>
    );
  }

  if (products.length === 0 || users.length === 0) {
    return <EmptyState message="داده‌ای برای نمایش وجود ندارد" />;
  }

  const stats = getDashboardStats(users, products);
  const statusData = adaptProductStatusToChart(products);
  const salesData = adaptProductsToSalesChart(products);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">داشبورد</h2>

      <StatsGrid stats={stats} />

      <AdminGuard>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold mb-2">امکانات مدیر</h3>
          <p className="text-sm text-gray-400">
            این بخش فقط برای مدیر سیستم نمایش داده می‌شود
          </p>
        </div>
      </AdminGuard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductSalesBarChart data={salesData} />
        <ProductStatusPieChart data={statusData} />
      </div>
    </div>
  );
};

export default DashboardPage;
