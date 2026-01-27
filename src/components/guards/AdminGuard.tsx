"use client";

import { useAuthStore } from "@/stores/auth.store";

const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthStore((s) => s.user);
  if (!user || user.role !== "admin") return null;
  return <>{children}</>;
};

export default AdminGuard;
