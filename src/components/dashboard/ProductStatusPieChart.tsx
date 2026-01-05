"use client";

import { ProductStatusStat } from "@/utils/calculateProductStatusStats";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface Props {
  data: ProductStatusStat[];
}

const COLORS = ["#22c55e", "#ef4444"]; // green / red

const ProductStatusPieChart = ({ data }: Props) => {
  const chartData = data.map((item) => ({
    name: item.name,
    value: item.value,
  }));
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">وضعیت محصولات</h3>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductStatusPieChart;
