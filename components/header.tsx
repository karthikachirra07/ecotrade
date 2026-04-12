"use client";

import Link from "next/link";

export function Header() {
  return (
    <header style={{ background: "green", padding: "10px", color: "white" }}>
      <h2>🌱 EcoTrade</h2>
      <nav>
        <Link href="/">Home</Link> |{" "}
        <Link href="/products">Products</Link> |{" "}
        <Link href="/sellers">Sellers</Link> |{" "}
        <Link href="/cart">Cart</Link>
      </nav>
    </header>
  );
}

