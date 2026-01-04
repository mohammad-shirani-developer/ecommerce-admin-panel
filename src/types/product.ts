export type ProductCategory =
  | "mobile"
  | "laptop"
  | "accessory"
  | "audio"
  | "wearable";

export type ProductStatus = "active" | "inactive";
export interface Product {
  id: number;
  name: string;
  price: number;
  category: ProductCategory | string;
  stock: number;
  status: ProductStatus;
}

export type CreateProductInput = Omit<Product, "id">;
