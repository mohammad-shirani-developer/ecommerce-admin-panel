import { Product } from "@/types/product";
import { User } from "@/types/user";

export const getDashboardChartStats = (users: User[], products: Product[]) => {
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "active").length;
  const inactiveUsers = totalUsers - activeUsers;

  const totalProducts = products.length;

  return [
    { label: "کل کاربران", value: totalUsers },
    { label: "کاربران فعال", value: activeUsers },
    { label: "کاربران غیرفعال", value: inactiveUsers },
    { label: "کل محصولات", value: totalProducts },
  ];
};
