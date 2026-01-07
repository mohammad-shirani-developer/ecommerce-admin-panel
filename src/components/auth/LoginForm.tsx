"use client";

import { useAuthStore } from "@/stores/auth.store";
import { generateFakeJWT } from "@/utils/auth/fakeJwt";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  const handleLogin = (role: "admin" | "user") => {
    const user = {
      id: 1,
      name: role === "admin" ? "ادمین" : "کاربر",
      email: "test@test.com",
      role,
    };

    const token = generateFakeJWT({
      id: user.id,
      role: user.role,
    });

    login(user, token);
    router.replace("/dashboard");
  };

  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto mt-20">
      <button onClick={() => handleLogin("admin")} className="btn-primary">
        ورود به عنوان ادمین
      </button>

      <button onClick={() => handleLogin("user")} className="btn-secondary">
        ورود به عنوان کاربر
      </button>
    </div>
  );
};

export default LoginPage;
