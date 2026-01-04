interface StatItem {
  label: string;
  value: number;
}

interface StatsGridProps {
  stats: StatItem[];
}

const StatsGrid = ({ stats }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-gray-700 p-4 rounded-lg shadow-sm text-white"
        >
          <p className="text-gray-300 text-sm">{stat.label}</p>
          <p className="text-xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
