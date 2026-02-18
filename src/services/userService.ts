import { usersDB } from "@/data/users";
import { CreateUserInput, User } from "@/types/user";

let users = [...usersDB];

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export const usersService = {
  async getAll(): Promise<User[]> {
    await delay();
    return [...users];
  },

  async create(data: CreateUserInput): Promise<User> {
    await delay();
    const newUser: User = {
      id: Date.now(),
      status: "active",
      ...data,
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
