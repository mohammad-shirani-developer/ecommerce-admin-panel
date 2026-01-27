import { Product } from "@/types/product";

export let productsDB: Product[] = [
  {
    id: 1,
    name: "گوشی موبایل سامسونگ Galaxy A14",
    price: 7800000,
    category: "دیجیتال",
    status: "active",
  },
  {
    id: 2,
    name: "لپ‌تاپ لنوو IdeaPad 3",
    price: 23500000,
    category: "دیجیتال",
    status: "active",
  },
  {
    id: 3,
    name: "هدفون بی‌سیم شیائومی Redmi Buds 4",
    price: 1650000,
    category: "دیجیتال",
    status: "inactive",
  },
  {
    id: 4,
    name: "کتاب اثر مرکب",
    price: 320000,
    category: "کتاب",
    status: "active",
  },
  {
    id: 5,
    name: "کتاب انسان در جستجوی معنا",
    price: 290000,
    category: "کتاب",
    status: "active",
  },
  {
    id: 6,
    name: "تی‌شرت مردانه نخی",
    price: 420000,
    category: "پوشاک",
    status: "inactive",
  },
  {
    id: 7,
    name: "هودی مردانه",
    price: 980000,
    category: "پوشاک",
    status: "active",
  },
  {
    id: 8,
    name: "ماشین لباسشویی اسنوا 7 کیلویی",
    price: 18500000,
    category: "لوازم خانگی",
    status: "active",
  },
  {
    id: 9,
    name: "جاروبرقی پارس‌خزر Turbo",
    price: 5600000,
    category: "لوازم خانگی",
    status: "inactive",
  },
  {
    id: 10,
    name: "ماوس بی‌سیم لاجیتک M185",
    price: 750000,
    category: "دیجیتال",
    status: "active",
  },
  {
    id: 11,
    name: "کیبورد مکانیکی Redragon",
    price: 1950000,
    category: "دیجیتال",
    status: "active",
  },
  {
    id: 12,
    name: "کتری برقی بوش",
    price: 2100000,
    category: "لوازم خانگی",
    status: "inactive",
  },
];

export const getProductsDB = () => productsDB;

export const setProductsDB = (newProducts: Product[]) => {
  productsDB = newProducts;
};
