import { Product } from "@/types/product";
import { db } from "./db";

export const productsApi = {
  async getProducts(): Promise<Product[]> {
    return [...db.products];
  },

  async createProduct(product: Omit<Product, "id">): Promise<Product> {
    const newProduct: Product = {
      ...product,
      id: db.products.length
        ? Math.max(...db.products.map((p) => p.id)) + 1
        : 1,
    };

    db.products.push(newProduct);
    return newProduct;
  },

  async updateProduct(updated: Product): Promise<Product> {
    db.products = db.products.map((p) => (p.id === updated.id ? updated : p));
    return updated;
  },

  async deleteProduct(productId: number): Promise<void> {
    db.products = db.products.filter((p) => p.id !== productId);
  },
};
