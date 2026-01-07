"use client";

import { useAuthStore } from "@/stores/auth.store";
import { removeAuthCookie } from "@/utils/auth/token";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  return () => {
    logout(); // Zustand
    removeAuthCookie(); // Cookie
    router.replace("/login");
  };
};
