export type UserStatus = "active" | "inactive";

export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  status: UserStatus;
}

export interface CreateUserInput {
  name: string;
  email: string;
  role: "admin" | "user";
  status: UserStatus;
}
