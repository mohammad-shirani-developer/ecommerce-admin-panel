"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  allowedRoles: ("admin" | "user")[];
  children: React.ReactNode;
}

const RoleGuard = ({ allowedRoles, children }: Props) => {
  const { user, isAuthenticated, hasHydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!hasHydrated) return;

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (user && !allowedRoles.includes(user.role)) {
      router.replace("/403");
    }
  }, [hasHydrated, isAuthenticated, user, allowedRoles, router]);

  // ⛔ جلوگیری از Flash
  if (!hasHydrated) return null;

  // ⛔ تا زمان redirect چیزی نشون نده
  if (!isAuthenticated) return null;

  if (user && !allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
};

export default RoleGuard;
