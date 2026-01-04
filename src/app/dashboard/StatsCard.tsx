import { memo } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

const StatsCard = ({ title, value, icon }: StatsCardProps) => {
  return (
    <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-xl font-semibold mt-1">{value}</p>
        </div>

        {icon && <div className="text-gray-400 text-2xl">{icon}</div>}
      </div>
    </div>
  );
};

export default memo(StatsCard);
