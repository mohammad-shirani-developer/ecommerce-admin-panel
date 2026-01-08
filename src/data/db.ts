import { Product } from "@/types/product";
import { User } from "@/types/user";
import { generateProducts } from "@/utils/generateProducts";
import { generateUsers } from "@/utils/generateUsers";

interface Database {
  users: User[];
  products: Product[];
}

export const db: Database = {
  users: generateUsers(20),
  products: generateProducts(15),
};
