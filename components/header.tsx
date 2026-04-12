"use client";

import Link from "next/link";

export function Header() {
  return (
    <header
      style={{
        backgroundColor: "#16a34a",
        color: "white",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Logo / Title */}
      <h1 style={{ fontSize: "22px", fontWeight: "bold" }}>
        🌱 EcoTrade
      </h1>

      {/* Navigation Links */}
      <nav>
        <Link href="/" style={{ marginRight: "15px", color: "white" }}>
          Home
        </Link>
        <Link href="/products" style={{ marginRight: "15px", color: "white" }}>
          Products
        </Link>
        <Link href="/sellers" style={{ marginRight: "15px", color: "white" }}>
          Sellers
        </Link>
        <Link href="/login" style={{ marginRight: "15px", color: "white" }}>
          Login
        </Link>
        <Link href="/signup" style={{ color: "white" }}>
          Signup
        </Link>
      </nav>
    </header>
  );
}