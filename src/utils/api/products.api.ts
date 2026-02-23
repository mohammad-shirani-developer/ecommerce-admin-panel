import { getProductsDB, setProductsDB } from "@/data/products";
import { Product } from "@/types/product";

export const productsApi = {
  async fetchAll(): Promise<Product[]> {
    // ✅ نوع مشخص شد
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const hasError = Math.random() > 0.8; // Simulating network failure (20% chance)
        if (hasError) {
          reject("خطای شبکه! لطفاً دوباره تلاش کنید.");
        } else {
          resolve(getProductsDB());
        }
      }, 1000);
    });
  },

  async update(productId: number, payload: Partial<Product>): Promise<Product> {
    const products = getProductsDB();

    const updatedProducts = products.map((p) =>
      p.id === productId ? { ...p, ...payload } : p,
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
