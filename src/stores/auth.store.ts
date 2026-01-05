import { create } from "zustand";

type UserRole = "admin" | "user" | "guest";

interface AuthUser {
  id: string;
  name: string;
  role: UserRole;
}

interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  Login: (email: string, password: string) => void;
  Logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  Login: (email: string, password: string) => {
    if (!email || !password) return;
    const fakeUser: AuthUser = {
      id: "1",
      name: "محمد شیرانی",
      role: "user",
    };
    set({ isAuthenticated: true, user: fakeUser });
  },
  Logout: () => {
    set({ isAuthenticated: false, user: null });
  },
}));
