import { Product } from "./types";

/* =========================
   🧑‍🌾 SELLERS DATA
========================= */

export const sellers = [
  {
    id: 1,
    name: "Farmer John",
    city: "Hyderabad",
    pincode: "500001",
  },
  {
    id: 2,
    name: "Green Store",
    city: "Secunderabad",
    pincode: "500002",
  },
];

/* =========================
   📦 PRODUCTS DATA
========================= */

export const products: Product[] = [
  {
    id: 1,
    name: "Eco Bottle",
    description: "Reusable stainless steel bottle",
    category: "Kitchen",
    ecoScore: 9,
    price: 200,
    unit: "piece",
    quantity: 1,
    sellerId: 1,
    inStock: true,
    rating: 4.5,
    reviews: 120,
  },
  {
    id: 2,
    name: "Reusable Bag",
    description: "Cloth shopping bag",
    category: "Accessories",
    ecoScore: 8,
    price: 100,
    unit: "piece",
    quantity: 1,
    sellerId: 2,
    inStock: true,
    rating: 4.2,
    reviews: 80,
  },
  {
    id: 3,
    name: "Bamboo Toothbrush",
    description: "Eco-friendly toothbrush",
    category: "Personal Care",
    ecoScore: 10,
    price: 80,
    unit: "piece",
    quantity: 1,
    sellerId: 1,
    inStock: true,
    rating: 4.7,
    reviews: 150,
  },
];

/* =========================
   ⚙️ HELPER FUNCTIONS
========================= */

// Get all products
export const getAllProducts = () => {
  return products;
};

// Get categories (unique)
export const getCategories = () => {
  return [...new Set(products.map((p) => p.category))];
};

// Search products
export const searchProducts = (query: string) => {
  return products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );
};

// Get sellers by pincode
export const getSellersByPincode = (pincode: string) => {
  return sellers.filter((s) => s.pincode === pincode);
};

// Get products by seller
export const getProductsBySeller = (sellerId: number) => {
  return products.filter((p) => p.sellerId === sellerId);
};