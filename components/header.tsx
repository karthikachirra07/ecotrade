"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/lib/auth-context";

export function Header() {
  const { cart } = useCart();
  const { user, logout } = useAuth();

  return (
    <header style={styles.header}>
      <h2>🌱 EcoTrade</h2>

      <nav style={styles.nav}>
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/cart">Cart ({cart.length})</Link>
        <Link href="/orders">Orders 📦</Link>

        {user ? (
          <>
            <span>Hi, {user.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    borderBottom: "1px solid #ccc",
  },
  nav: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
};