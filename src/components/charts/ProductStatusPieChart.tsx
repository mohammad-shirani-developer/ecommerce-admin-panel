"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ChartData } from "../../utils/charts/charts.types";

interface Props {
  data: ChartData[];
}

const COLORS = ["#22c55e", "#ef4444"];

const ProductStatusPieChart = ({ data }: Props) => {
  const chartData = data.map((item) => ({
    name: item.name,
    value: item.value,
  }));
  if (!data.length) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg text-center text-gray-400">
        داده‌ای برای نمایش وجود ندارد
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">وضعیت محصولات</h3>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip
            formatter={(value?: number) =>
              value !== undefined ? `${value} عدد` : ""
            }
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductStatusPieChart;
