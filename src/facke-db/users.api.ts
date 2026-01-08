import { User } from "@/types/user";
import { db } from "./db";

export const usersApi = {
  async getUsers(): Promise<User[]> {
    return [...db.users];
  },

  async createUser(user: Omit<User, "id">): Promise<User> {
    const newUser: User = {
      ...user,
      id: db.users.length ? Math.max(...db.users.map((u) => u.id)) + 1 : 1,
    };

    db.users.push(newUser);
    return newUser;
  },

  async updateUser(updatedUser: User): Promise<User> {
    db.users = db.users.map((u) => (u.id === updatedUser.id ? updatedUser : u));
    return updatedUser;
  },

  async deleteUser(userId: number): Promise<void> {
    db.users = db.users.filter((u) => u.id !== userId);
  },
};
