import { getProductsDB, setProductsDB } from "@/data/products";
import { Product } from "@/types/product";

export const productsApi = {
  async fetchAll(): Promise<Product[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getProductsDB()), 300);
    });
  },

  async update(productId: number, payload: Partial<Product>): Promise<Product> {
    const products = getProductsDB();

    const updatedProducts = products.map((p) =>
      p.id === productId ? { ...p, ...payload } : p
    );

    setProductsDB(updatedProducts);

    const updatedProduct = updatedProducts.find((p) => p.id === productId)!;
    return updatedProduct;
  },

  async delete(productId: number): Promise<void> {
    const products = getProductsDB().filter((p) => p.id !== productId);
    setProductsDB(products);
  },
};
