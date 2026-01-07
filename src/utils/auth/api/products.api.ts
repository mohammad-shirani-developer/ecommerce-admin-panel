import { Product } from "@/types/product";
import { generateProducts } from "@/utils/generateProducts";

export const fetchProducts = async (): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return generateProducts(15);
};
