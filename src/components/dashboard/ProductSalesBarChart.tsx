"use client";

import { productCategoryLabel } from "@/constants/productCategoryMap";
import { CategorySales } from "@/utils/calculateSalesByCategory";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  data: CategorySales[];
}

const ProductSalesBarChart = ({ data }: Props) => {
  const chartData = data.map((item) => ({
    name: productCategoryLabel[item.category],
    sales: item.totalSales,
  }));

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">فروش محصولات بر اساس دسته</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid stroke="#444" strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: "#ccc" }} />
          <YAxis tick={{ fill: "#ccc" }} />
          <Tooltip
            formatter={(value?: number) => {
              if (typeof value !== "number") return "";

              return value.toLocaleString("fa-IR") + " تومان";
            }}
          />
          <Bar dataKey="sales" fill="#3b82f6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductSalesBarChart;
