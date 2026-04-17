"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { getAllProducts } from "@/lib/data";
import { ProductCard } from "@/components/product-card";

export default function ProductsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login"); // 🔒 must login
    }
  }, [user, isLoading]);

  if (!user) return <h2>Redirecting...</h2>;

  const products = getAllProducts();

  return (
    <div>
      <h1>All Products 🛍️</h1>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}