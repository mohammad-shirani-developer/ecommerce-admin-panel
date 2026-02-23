import { productsDB } from "@/data/products";
import { CreateProductInput, Product } from "@/types/product";

let products = [...productsDB];

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export const productsService = {
  async getAll(): Promise<Product[]> {
    await delay();
    return [...products];
  },

  async create(data: CreateProductInput): Promise<Product> {
    await delay();
    const newProduct: Product = {
      id: Date.now(),
      ...data,
    };
    products = [newProduct, ...products];
    return newProduct;
  },

  async update(updated: Product): Promise<Product> {
    await delay();
    products = products.map((p) => (p.id === updated.id ? updated : p));
    return updated;
  },

  async remove(id: number): Promise<void> {
    await delay();
    products = products.filter((p) => p.id !== id);
  },
};
