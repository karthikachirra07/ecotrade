/* =========================
   📦 PRODUCTS DATA
========================= */
import { Product, Seller } from "./types";

export const sellers: Seller[] = [
  { id: 1, name: "Farmer John", city: "Hyderabad", pincode: "500001" },
  { id: 2, name: "Green Store", city: "Secunderabad", pincode: "500002" },
  { id: 3, name: "Organic Meadows", city: "Hyderabad", pincode: "500003" },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Organic Tomatoes",
    description: "Fresh organic tomatoes - pesticide-free, locally grown. Rich in Vitamin C and lycopene.",
    category: "Vegetables",
    ecoScore: 5,
    price: 60,
    unit: "kg",
    quantity: 10,
    sellerId: 1,
    inStock: true,
    rating: 4.8,
    reviews: 245,
    certification: "NOOP Certified",
    seasonal: true,
    benefits: ["Rich in Vitamin C", "High Antioxidants", "Zero Pesticides"],
    icon: "🍅",
  },
  {
    id: 2,
    name: "Rainwater Irrigated Carrots",
    description: "Fresh carrots grown with rainwater irrigation - zero chemical fertilizers. Sweet and crunchy.",
    category: "Vegetables",
    ecoScore: 5,
    price: 50,
    unit: "kg",
    quantity: 8,
    sellerId: 2,
    inStock: true,
    rating: 4.6,
    reviews: 189,
    certification: "Fair Trade",
    seasonal: false,
    benefits: ["High in Beta-Carotene", "Eye Health", "Supports Immunity"],
    icon: "🥕",
  },
  {
    id: 3,
    name: "Farm Fresh Leafy Greens",
    description: "Mixed leafy greens - spinach, kale, lettuce - all organic and pesticide-free.",
    category: "Vegetables",
    ecoScore: 5,
    price: 40,
    unit: "bunch",
    quantity: 15,
    sellerId: 1,
    inStock: true,
    rating: 4.7,
    reviews: 156,
    certification: "NOOP Certified",
    seasonal: true,
    benefits: ["Iron Rich", "Calcium Source", "Digestive Health"],
    icon: "🥬",
  },
  {
    id: 4,
    name: "Natural Dhoop Mango",
    description: "Sweet mangoes - ripened naturally under sun. Peak season delicacy from organic orchards.",
    category: "Fruits",
    ecoScore: 4,
    price: 120,
    unit: "kg",
    quantity: 5,
    sellerId: 2,
    inStock: true,
    rating: 4.5,
    reviews: 112,
    certification: "Organic",
    seasonal: true,
    benefits: ["Natural Sweetness", "Digestive Aid", "Immune Booster"],
    icon: "🥭",
  },
  {
    id: 5,
    name: "Raw Honey",
    description: "Pure raw honey - unprocessed, no additives. Collected from bee farms with wild flowers.",
    category: "Honey",
    ecoScore: 5,
    price: 350,
    unit: "litre",
    quantity: 2,
    sellerId: 1,
    inStock: true,
    rating: 4.9,
    reviews: 203,
    certification: "Bee Friendly",
    seasonal: false,
    benefits: ["Natural Antibacterial", "Energy Boost", "Cough Relief"],
    icon: "🍯",
  },
  {
    id: 6,
    name: "Free Range Eggs",
    description: "Fresh eggs from free-range hens fed on natural grains. Collected daily from happy hens.",
    category: "Eggs",
    ecoScore: 4,
    price: 80,
    unit: "dozen",
    quantity: 10,
    sellerId: 2,
    inStock: true,
    rating: 4.7,
    reviews: 178,
    certification: "Animal Welfare Approved",
    seasonal: false,
    benefits: ["High Protein", "Rich in Choline", "Selenium Source"],
    icon: "🥚",
  },
  {
    id: 7,
    name: "Millets (Jowar)",
    description: "Healthy millets - gluten-free grain for wholesome meals. Traditional and nutritious.",
    category: "Grains",
    ecoScore: 5,
    price: 70,
    unit: "kg",
    quantity: 12,
    sellerId: 3,
    inStock: true,
    rating: 4.6,
    reviews: 95,
    certification: "NOOP Certified",
    seasonal: false,
    benefits: ["Gluten Free", "High Fibre", "Climate Resilient"],
    icon: "🌾",
  },
  {
    id: 8,
    name: "Cow Milk (Fresh)",
    description: "Fresh cow milk from grass-fed cattle. Collected twice daily, no preservatives.",
    category: "Dairy",
    ecoScore: 4,
    price: 55,
    unit: "litre",
    quantity: 20,
    sellerId: 1,
    inStock: true,
    rating: 4.8,
    reviews: 267,
    certification: "Dairy Safe",
    seasonal: false,
    benefits: ["Calcium Rich", "High Quality Protein", "Natural Probiotics"],
    icon: "🥛",
  },
  {
    id: 9,
    name: "Turmeric Powder",
    description: "Pure turmeric powder - ground fresh from organically grown roots. Anti-inflammatory.",
    category: "Spices",
    ecoScore: 5,
    price: 180,
    unit: "kg",
    quantity: 3,
    sellerId: 3,
    inStock: true,
    rating: 4.9,
    reviews: 134,
    certification: "Organic",
    seasonal: false,
    benefits: ["Anti-Inflammatory", "Golden Color", "Medicinal"],
    icon: "✨",
  },
  {
    id: 10,
    name: "Seasonal Berries Mix",
    description: "Mixed fresh berries - blueberries, strawberries, raspberries. Picked fresh daily.",
    category: "Fruits",
    ecoScore: 5,
    price: 250,
    unit: "kg",
    quantity: 4,
    sellerId: 2,
    inStock: true,
    rating: 4.9,
    reviews: 189,
    certification: "Organic",
    seasonal: true,
    benefits: ["Antioxidant Rich", "Brain Health", "Heart Healthy"],
    icon: "🫐",
  },
];

/* =========================
   ⚙️ HELPER FUNCTIONS
========================= */

// Get all products
export const getAllProducts = () => {
  return products;
};



// Search products
export const searchProducts = (query: string) => {
  return products.filter((p) =>
    (p.name || "").toLowerCase().includes((query || "").toLowerCase())
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

// Get product by ID
export const getProductById = (id: number) => {
  return products.find((p) => p.id === id);
};

// Get seller by ID
export const getSellerById = (id: number) => {
  return sellers.find((s) => s.id === id);
};

export const getProductByCategory = (category: string) => {
  return products.filter((p) => p.category === category);
};
export const categories = ["Vegetables", "Fruits", "Dairy"];

export function getCategories() {
  return categories;
}

export function getProductsByCategory(category: string) {
  return [];
}

// Calculate distance between two pincodes (mock implementation)
export const calculateDistance = (pincode1: string, pincode2: string): number => {
  const hashCode = (s: string) => {
    let h = 0;
    for (let i = 0; i < s.length; i++) {
      h = ((h << 5) - h) + s.charCodeAt(i);
      h |= 0;
    }
    return Math.abs(h);
  };
  const combined = pincode1 + pincode2;
  return (hashCode(combined) % 25) + 2;
};

// Calculate carbon footprint savings
export const calculateCarbonSavings = (distanceKm: number): number => {
  const carbonPerKm = 0.21;
  const supermarketEmission = distanceKm * carbonPerKm * 3.5;
  return supermarketEmission - (distanceKm * carbonPerKm);
};

// Calculate average eco score
export const calculateAverageEcoScore = (productIds: number[]): number => {
  if (productIds.length === 0) return 0;
  const total = productIds.reduce((sum, id) => {
    const product = products.find(p => p.id === id);
    return sum + (product?.ecoScore || 0);
  }, 0);
  return Math.round((total / productIds.length) * 10) / 10;
};

export function getSellerProducts() {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("seller_products") || "[]");
}

/* =========================
   🏆 GAMIFICATION & ANALYTICS
========================= */

// Get achievements based on order history
export const getUserAchievements = (orders: any[]) => {
  const achievements = [];
  
  if (orders.length >= 1) {
    achievements.push({ id: 1, name: "First Order", icon: "🎉", description: "Placed your first order" });
  }
  if (orders.length >= 5) {
    achievements.push({ id: 2, name: "Eco Warrior", icon: "🌿", description: "Placed 5+ eco-friendly orders" });
  }
  if (orders.length >= 10) {
    achievements.push({ id: 3, name: "Local Hero", icon: "💚", description: "Placed 10+ orders from local farmers" });
  }

  const totalCarbonSaved = orders.reduce((sum: number, o: any) => sum + (o.carbonSaved || 0), 0);
  if (totalCarbonSaved >= 50) {
    achievements.push({ id: 4, name: "Planet Protector", icon: "🌍", description: "Saved 50kg CO2" });
  }
  if (totalCarbonSaved >= 100) {
    achievements.push({ id: 5, name: "Climate Champion", icon: "⚡", description: "Saved 100kg CO2" });
  }

  const totalSpent = orders.reduce((sum: number, o: any) => sum + (o.totalAmount || 0), 0);
  if (totalSpent >= 5000) {
    achievements.push({ id: 6, name: "Supporter", icon: "💎", description: "Spent 5000+ rupees supporting farmers" });
  }

  return achievements;
};

// Get recommended products based on category preferences
export const getRecommendedProducts = (orderHistory: any[] = [], limit: number = 4) => {
  const categories = orderHistory.flatMap((o: any) => 
    o.items?.map((item: any) => {
      const product = products.find(p => p.id === item.id);
      return product?.category;
    }) || []
  );

  const favoriteCategory = categories.length > 0 
    ? categories.sort((a: any, b: any) => categories.filter((x: any) => x === a).length - categories.filter((x: any) => x === b).length).pop()
    : null;

  let recommended: Product[] = [];
  if (favoriteCategory) {
    recommended = products.filter(p => p.category === favoriteCategory && p.rating && p.rating > 4.5).slice(0, 2);
  }
  
  // Fill remaining with high-rated products
  recommended = [...recommended, ...products.filter(p => p.rating && p.rating > 4.7).filter(p => !recommended.includes(p))].slice(0, limit);
  
  return recommended;
};

// Get top selling products by category
export const getTopProductsByCategory = (category: string, limit: number = 3) => {
  return products
    .filter(p => p.category === category)
    .sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
    .slice(0, limit);
};

// Calculate seller performance metrics
export const getSellerMetrics = (sellerId: number, orders: any[] = []) => {
  const sellerOrders = orders.filter(o => o.items?.some((item: any) => {
    const product = products.find(p => p.id === item.id);
    return product?.sellerId === sellerId;
  }));

  const sellerProducts = products.filter(p => p.sellerId === sellerId);
  const avgRating = sellerProducts.length > 0 
    ? (sellerProducts.reduce((sum, p) => sum + (p.rating || 0), 0) / sellerProducts.length).toFixed(1)
    : 0;

  const totalRevenue = sellerOrders.reduce((sum, o) => {
    const itemsTotal = o.items
      ?.filter((item: any) => {
        const product = products.find(p => p.id === item.id);
        return product?.sellerId === sellerId;
      })
      .reduce((s: number, item: any) => s + (item.price * item.quantity), 0) || 0;
    return sum + itemsTotal;
  }, 0);

  return {
    totalOrders: sellerOrders.length,
    totalRevenue,
    avgRating,
    totalProducts: sellerProducts.length,
    successRate: sellerOrders.length > 0 ? "98%" : "N/A",
  };
};

// Get seasonal products
export const getSeasonalProducts = () => {
  return products.filter(p => p.seasonal === true);
};

// Get products by certification
export const getProductsByCertification = (certification: string) => {
  return products.filter(p => p.certification === certification);
};