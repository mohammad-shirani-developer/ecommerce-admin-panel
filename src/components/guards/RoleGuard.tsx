"use client";

import { useAuthStore } from "@/stores/auth.store";

interface Props {
  allowedRoles: ("admin" | "user")[];
  children: React.ReactNode;
}

const RoleGuard = ({ allowedRoles, children }: Props) => {
  const user = useAuthStore((s) => s.user);

  if (!user || !allowedRoles.includes(user.role)) {
    return (
      <p className="text-red-500 text-sm">شما دسترسی به این بخش را ندارید</p>
    );
  }

  return <>{children}</>;
};

export default RoleGuard;
