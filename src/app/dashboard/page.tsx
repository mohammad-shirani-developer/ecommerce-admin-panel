import { AiFillDollarCircle } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import StatsGrid from "./StatsGrid";

const DashboardPage = () => {
  const stats = [
    { id: 1, title: "کل کاربران", value: 1500, icon: <FaUser /> },
    { id: 2, title: "کاربران فعال", value: 300, icon: <FaUser /> },
    {
      id: 3,
      title: "درآمد",
      value: "۱۲٬۰۰۰ تومان",
      icon: <AiFillDollarCircle />,
    },
  ];

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">داشبورد</h2>
      <StatsGrid items={stats} />
    </>
  );
};

export default DashboardPage;
