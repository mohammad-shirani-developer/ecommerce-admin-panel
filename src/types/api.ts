import { Product } from "./product";
import { User } from "./user";

export interface DashboardApiResponse {
  products: Product[];
  users: User[];
}
