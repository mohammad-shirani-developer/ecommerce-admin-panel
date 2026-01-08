import { AuthUser } from "@/types/auth";
import { generateFakeJWT } from "@/utils/auth/fakeJwt";

export const authApi = {
  async login(role: "admin" | "user") {
    const user: AuthUser = {
      id: 1,
      name: role === "admin" ? "ادمین" : "کاربر",
      email: "test@test.com",
      role,
    };

    const token = generateFakeJWT({
      id: user.id,
      role: user.role,
    });

    return { user, token };
  },

  async logout(): Promise<void> {
    return;
  },
};
