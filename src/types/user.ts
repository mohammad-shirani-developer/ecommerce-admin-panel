export type UserStatus = "active" | "inactive";

export interface User {
  id: number;
  name: string;
  email: string;
  status: UserStatus;
}

export type CreateUserInput = Omit<User, "id">;
