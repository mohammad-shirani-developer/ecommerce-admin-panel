import { Product, ProductCategory } from "@/types/product";

const productTemplates: {
  title: string;
  category: ProductCategory;
}[] = [
  { title: "گوشی موبایل", category: "mobile" },
  { title: "لپ‌تاپ", category: "laptop" },
  { title: "هدفون", category: "audio" },
  { title: "ساعت هوشمند", category: "wearable" },
  { title: "کیبورد", category: "accessory" },
  { title: "ماوس", category: "accessory" },
];

export const generateProducts = (count: number): Product[] => {
  return Array.from({ length: count }, (_, index) => {
    const template =
      productTemplates[Math.floor(Math.random() * productTemplates.length)];

    return {
      id: index + 1,
      name: `${template.title} مدل ${index + 1}`,
      category: template.category,
      price: Math.floor(Math.random() * 20_000_000) + 1_000_000,
      stock: Math.floor(Math.random() * 100),
      status: Math.random() > 0.2 ? "active" : "inactive",
    };
  });
};
