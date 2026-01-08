import { getUsersDB, setUsersDB } from "@/data/users";
import { User } from "@/types/user";

export const usersApi = {
  async fetchAll(): Promise<User[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getUsersDB()), 300);
    });
  },

  async update(userId: number, payload: Partial<User>): Promise<User> {
    const users = getUsersDB();

    const updatedUsers = users.map((u) =>
      u.id === userId ? { ...u, ...payload } : u
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
