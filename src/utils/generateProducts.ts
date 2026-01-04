import { Product, ProductCategory } from "@/types/product";

const productTemplates: {
  name: string;
  category: ProductCategory;
  basePrice: number;
  maxSold: number;
}[] = [
  {
    name: "گوشی موبایل",
    category: "mobile",
    basePrice: 15_000_000,
    maxSold: 80,
  },
  { name: "لپ‌تاپ", category: "laptop", basePrice: 40_000_000, maxSold: 30 },
  { name: "هدفون", category: "audio", basePrice: 3_000_000, maxSold: 120 },
  {
    name: "ساعت هوشمند",
    category: "wearable",
    basePrice: 8_000_000,
    maxSold: 60,
  },
  {
    name: "کیبورد",
    category: "accessory",
    basePrice: 1_500_000,
    maxSold: 150,
  },
];

export const generateProducts = (count: number): Product[] => {
  return Array.from({ length: count }, (_, index) => {
    const template =
      productTemplates[Math.floor(Math.random() * productTemplates.length)];

    const soldCount = Math.floor(Math.random() * template.maxSold);

    return {
      id: index + 1,
      name: `${template.name} مدل ${index + 1}`,
      category: template.category,
      price:
        template.basePrice +
        Math.floor(Math.random() * template.basePrice * 0.3),
      stock: Math.max(0, 100 - soldCount),
      soldCount,
      status: Math.random() > 0.2 ? "active" : "inactive",
    };
  });
};
