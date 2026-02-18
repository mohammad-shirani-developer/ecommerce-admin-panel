// services/userService.ts
import { usersDB } from "@/data/users";
import { CreateUserInput, User } from "@/types/user";

let users = [...usersDB];

const delay = (ms = 500) => new Promise((res) => setTimeout(res, ms));

export const userService = {
  async getAll(): Promise<User[]> {
    await delay();
    return [...users];
  },

  async create(data: CreateUserInput): Promise<User> {
    await delay();

    const newUser: User = {
      id: Date.now(),
      ...data,
      status: "active",
    };

    users = [newUser, ...users];
    return newUser;
  },

  async update(updated: User): Promise<User> {
    await delay();
    users = users.map((u) => (u.id === updated.id ? updated : u));
    return updated;
  },

  async remove(id: number): Promise<void> {
    await delay();
    users = users.filter((u) => u.id !== id);
  },
};
