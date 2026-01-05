"use client";

import { ChartData } from "@/utils/charts/charts.types";
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
  data: ChartData[];
}

const ProductSalesBarChart = ({ data }: Props) => {
  if (!data.length) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg text-center text-gray-400">
        داده‌ای برای نمایش وجود ندارد
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">فروش محصولات</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            formatter={(value?: number) =>
              value !== undefined ? value.toLocaleString() : ""
            }
          />
          <Bar dataKey="value" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductSalesBarChart;
