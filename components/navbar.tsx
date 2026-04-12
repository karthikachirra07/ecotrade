// app/components/Navbar.tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ padding: "15px", background: "#222", color: "#fff" }}>
      <Link href="/" style={{ margin: "10px", color: "#fff" }}>Home</Link>
      <Link href="/get-started" style={{ margin: "10px", color: "#fff" }}>Get Started</Link>
      <Link href="/products" style={{ margin: "10px", color: "#fff" }}>Browse Products</Link>
      <Link href="/sellers" style={{ margin: "10px", color: "#fff" }}>Sellers</Link>
      <Link href="/login" style={{ margin: "10px", color: "#fff" }}>Login</Link>
      <Link href="/signup" style={{ margin: "10px", color: "#fff" }}>Signup</Link>
    </nav>
  );
}