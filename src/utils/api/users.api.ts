import { getUsersDB, setUsersDB } from "@/data/users";
import { User } from "@/types/user";

export const usersApi = {
  async fetchAll(): Promise<User[]> {
    // ✅ نوع برگشتی مشخص شد
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const hasError = Math.random() > 0.8; // شبیه‌سازی خطای شبکه (۲۰٪)
        if (hasError) {
          reject("خطای شبکه! لطفاً دوباره تلاش کنید.");
        } else {
          resolve(getUsersDB()); // ✅ TS می‌داند User[]
        }
      }, 1000);
    });
  },

  async update(userId: number, payload: Partial<User>): Promise<User> {
    const users = getUsersDB();

    const updatedUsers = users.map((u) =>
      u.id === userId ? { ...u, ...payload } : u,
    );

    setUsersDB(updatedUsers);

    const updatedUser = updatedUsers.find((u) => u.id === userId)!;
    return updatedUser;
  },

  async delete(userId: number): Promise<void> {
    const users = getUsersDB().filter((u) => u.id !== userId);
    setUsersDB(users);
  },
};
