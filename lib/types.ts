// User types
export type UserRole = "admin"|"seller" | "consumer";
export type Product = {
  id: number;
  name: string;
  description: string;
  category: string;
  ecoScore: number;
  price: number;
  unit: string;
  quantity: number;
  sellerId: number;
  inStock: boolean;
  rating: number;
  reviews: number;
  certification?: string;
  seasonal?: boolean;
  benefits?: string[];
  sales?: number;
  revenue?: number;
  icon?: string;
};

export type Seller = {
  id: number;
  name: string;
  city: string;
  pincode: string;
};

export interface User {
  id: string;
  email: string;
  password: string; // In production, this would be hashed
  name: string;
  role: UserRole;
  pincode: string;
  city: string;
  createdAt: string;
  // Seller specific
  farmName?: string;
  farmDescription?: string;
  organicCertified?: boolean;
  practicesDescription?: string;
  // Consumer specific
  address?: string;
  status?: "pending" | "approved" | "rejected";
}

// Product types
export type ProductCategory =
  | "vegetables"
  | "fruits"
  | "dairy"
  | "grains"
  | "spices"
  | "honey"
  | "eggs"
  | "herbs";

export type UnitType = "kg" | "dozen" | "litre" | "piece" | "bunch" | "gram";

// Order types
export type OrderStatus = "pending" | "confirmed" | "delivered" | "cancelled";

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  unit: UnitType;
}

export interface Order {
  id: string;
  consumerId: string;
  consumerName: string;
  sellerId: string;
  sellerName: string;
  items: OrderItem[];
  totalAmount: number;
  carbonFootprint: number;
  ecoScore: number;
  txHash: string;
  status: OrderStatus;
  createdAt: string;
  deliveryAddress: string;
}

// Cart types
export interface CartItem {
  product: Product;
  quantity: number;
  sellerId: string;
  sellerName: string;
  sellerPincode: string;
}

// Blockchain transaction type
export interface BlockchainTransaction {
  txHash: string;
  from: string;
  to: string;
  amount: number;
  timestamp: number;
  productIds: number[];
  blockNumber: number;
}

// Seller with distance (for consumer view)
export interface SellerWithDistance extends User {
  distance: number;
  totalProducts: number;
  avgEcoScore: number;
}
