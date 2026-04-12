"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { Order, CartItem } from "./types";
import { useAuth } from "./auth-context";
import { blockchain } from "./blockchain";
import { getSellerById } from "./data";

interface OrdersContextType {
  orders: Order[];
  createOrder: (
    items: CartItem[],
    totalAmount: number,
    carbonFootprint: number,
    ecoScore: number,
    deliveryAddress: string
  ) => Promise<Order>;
  getOrdersByUser: () => Order[];
  getOrdersBySeller: () => Order[];
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

const ORDERS_KEY = "ecotrade_orders";

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const saved = localStorage.getItem(ORDERS_KEY);
    if (saved) {
      setOrders(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  const createOrder = async (
    items: CartItem[],
    totalAmount: number,
    carbonFootprint: number,
    ecoScore: number,
    deliveryAddress: string
  ): Promise<Order> => {
    if (!user) throw new Error("User must be logged in to create an order");

    // Group items by seller
    const sellerGroups = items.reduce((groups, item) => {
      const sellerId = item.sellerId;
      if (!groups[sellerId]) {
        groups[sellerId] = [];
      }
      groups[sellerId].push(item);
      return groups;
    }, {} as Record<string, CartItem[]>);

    // Create orders for each seller
    const newOrders: Order[] = [];

    for (const [sellerId, sellerItems] of Object.entries(sellerGroups)) {
      const seller = getSellerById(sellerId);
      const sellerTotal = sellerItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      // Create blockchain transaction
      const tx = blockchain.createTransaction(
        user.id,
        sellerId,
        sellerTotal,
        sellerItems.map((item) => item.product.id)
      );

      const order: Order = {
        id: `order-${Date.now()}-${sellerId}`,
        consumerId: user.id,
        consumerName: user.name,
        sellerId,
        sellerName: seller?.farmName || seller?.name || "Unknown Seller",
        items: sellerItems.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          unit: item.product.unit,
        })),
        totalAmount: sellerTotal,
        carbonFootprint,
        ecoScore,
        txHash: tx.txHash,
        status: "pending",
        createdAt: new Date().toISOString(),
        deliveryAddress,
      };

      newOrders.push(order);
    }

    setOrders((prev) => [...prev, ...newOrders]);

    // Return the first order (or combined if needed)
    return newOrders[0];
  };

  const getOrdersByUser = (): Order[] => {
    if (!user) return [];
    return orders.filter((order) => order.consumerId === user.id);
  };

  const getOrdersBySeller = (): Order[] => {
    if (!user || user.role !== "seller") return [];
    return orders.filter((order) => order.sellerId === user.id);
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        createOrder,
        getOrdersByUser,
        getOrdersBySeller,
        updateOrderStatus,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
}
