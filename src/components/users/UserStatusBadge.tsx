import { memo } from "react";

interface BadgeProps {
  status: "active" | "inactive";
  onClick?: () => void;
}

const UserStatusBadge = ({ status, onClick }: BadgeProps) => {
  const text = status === "active" ? "فعال" : "غیر فعال";

  return (
    <span
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium
        ${onClick ? "cursor-pointer transition hover:opacity-80" : ""}
        ${
          status === "active"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
    >
      {text}
    </span>
  );
};

export default memo(UserStatusBadge);
