"use client";

import { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";


interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <div style={{ border: "1px solid gray", padding: "10px" }}>
      <Link href={`/products/${product.id}`}>
        <h3>{product.name}</h3>
      </Link>
      <p>{product.description}</p>
      <p>₹{product.price}</p>
      <p>🌱 Eco: {product.ecoScore}</p>
    </div>
  );
}
