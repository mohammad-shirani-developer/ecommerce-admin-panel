import { productsDB } from "@/data/products";
import { usersDB } from "@/data/users";
import { DashboardStats } from "@/types/dashboard";

const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms));

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    await delay();

    const totalUsers = usersDB.length;
    const activeUsers = usersDB.filter((u) => u.status === "active").length;

    const totalProducts = productsDB.length;
    const activeProducts = productsDB.filter(
      (p) => p.status === "active",
    ).length;

    const totalRevenue = productsDB.reduce(
      (sum, p) => sum + p.price * (p.soldCount ?? 0),
      0,
    );

    return {
      totalUsers,
      activeUsers,
      totalProducts,
      activeProducts,
      totalRevenue,
    };
  },
};
