"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { CartItem, Product } from "./types";
import { getSellerById, calculateDistance } from "./data";
import { useAuth } from "./auth-context";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalAmount: () => number;
  getTotalItems: () => number;
  getAverageEcoScore: () => number;
  getTotalCarbonFootprint: (userPincode: string) => number;
  getCarbonSaved: (userPincode: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_KEY = "ecotrade_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(CART_KEY);
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, quantity: number = 1) => {
    const seller = getSellerById(product.sellerId);
    if (!seller) return;

    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          product,
          quantity,
          sellerId: seller.id,
          sellerName: seller.farmName || seller.name,
          sellerPincode: seller.pincode,
        },
      ];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalAmount = () => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getAverageEcoScore = () => {
    if (items.length === 0) return 0;
    const totalScore = items.reduce(
      (total, item) => total + item.product.ecoScore * item.quantity,
      0
    );
    return Math.round((totalScore / getTotalItems()) * 10) / 10;
  };

  const getTotalCarbonFootprint = (userPincode: string) => {
    if (items.length === 0) return 0;
    
    // Calculate average distance to all sellers
    const uniqueSellers = [...new Set(items.map((item) => item.sellerPincode))];
    const totalDistance = uniqueSellers.reduce((total, pincode) => {
      return total + calculateDistance(userPincode, pincode);
    }, 0);
    
    // 0.21 kg CO2 per km for bike delivery
    return Math.round(totalDistance * 0.21 * 100) / 100;
  };

  const getCarbonSaved = (userPincode: string) => {
    // Average supermarket supply chain: ~500km per product
    const avgSupplyChainDistance = 500;
    const carbonFootprint = getTotalCarbonFootprint(userPincode);
    const supermarketCarbon = avgSupplyChainDistance * 0.21;
    return Math.max(0, Math.round((supermarketCarbon - carbonFootprint) * 100) / 100);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalAmount,
        getTotalItems,
        getAverageEcoScore,
        getTotalCarbonFootprint,
        getCarbonSaved,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
