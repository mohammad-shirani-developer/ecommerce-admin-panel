export type ProductStatus = "active" | "inactive";
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  status: ProductStatus;
}

export type CreateProductInput = Omit<Product, "id">;
