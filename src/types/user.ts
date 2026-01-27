export type UserStatus = "active" | "inactive";

export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  status: UserStatus;
}

export type CreateUserInput = Omit<User, "id">;
