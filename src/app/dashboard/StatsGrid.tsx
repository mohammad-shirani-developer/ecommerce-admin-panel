import StatsCard from "./StatsCard";

interface StatItem {
  id: number;
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

interface StatsGridProps {
  items: StatItem[];
}

const StatsGrid = ({ items }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <StatsCard
          key={item.id}
          title={item.title}
          value={item.value}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default StatsGrid;
