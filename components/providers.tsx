"use client";

import { CartProvider } from "@/hooks/useCart";
import { AuthProvider } from "@/lib/auth-context";
import { OrdersProvider } from "@/lib/orders-context";

export function Providers({ children }: any) {
  return (
    <AuthProvider>
      <CartProvider>
        <OrdersProvider>{children}</OrdersProvider>
      </CartProvider>
    </AuthProvider>
  );
}