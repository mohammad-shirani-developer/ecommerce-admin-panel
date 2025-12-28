interface BadgeProps {
  status: "active" | "inactive";
}

const UserStatusBadge = ({ status }: BadgeProps) => {
  const color = status === "active" ? "green" : "red";
  const text = status === "active" ? "فعال" : "غیر فعال";

  return (
    <span
      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
        color === "green"
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }`}
    >
      {text}
    </span>
  );
};

export default UserStatusBadge;
