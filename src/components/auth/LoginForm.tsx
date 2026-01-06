"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      id: 1,
      name: "Admin",
      email,
    });
    router.replace("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-lg w-full max-w-sm"
    >
      <h1 className="text-xl font-bold mb-4">ورود</h1>

      <input
        className="w-full mb-3 p-2 rounded bg-gray-700"
        placeholder="ایمیل"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full mb-4 p-2 rounded bg-gray-700"
        type="password"
        placeholder="رمز عبور"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="w-full bg-blue-600 py-2 rounded">ورود</button>
    </form>
  );
};

export default LoginForm;
