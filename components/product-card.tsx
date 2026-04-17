"use client";

import { useCart } from "@/hooks/useCart";
import { EcoScore } from "./eco-score";
import Link from "next/link";

export function ProductCard({ product }: any) {
  const { addToCart } = useCart();

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm hover:shadow-lg transition-all hover:scale-105">
      {/* Product Icon */}
      <div className="mb-4 text-center">
        <div className="inline-block rounded-full bg-primary/10 p-4">
          <span className="text-5xl">{product.icon || "🍃"}</span>
        </div>
      </div>

      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>
        </div>
        <div className="rounded-full bg-primary/10 px-2 py-1">
          <span className="text-xs font-medium text-primary">{product.unit}</span>
        </div>
      </div>

      <div className="mb-4">
        <EcoScore score={product.ecoScore} size="sm" showLabel={true} />
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Price per {product.unit}</p>
          <p className="text-2xl font-bold text-primary">₹{product.price}</p>
        </div>
        <div className="text-right text-xs text-muted-foreground">
          <p>⭐ {product.rating}</p>
          <p>{product.reviews} reviews</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Link href={`/products/${product.id}`} className="flex-1">
          <button className="w-full rounded-lg border-2 border-primary px-3 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 transform hover:scale-105 active:scale-95">
            View Details
          </button>
        </Link>
        <button
          onClick={() => addToCart(product)}
          className="flex-1 rounded-lg bg-primary px-3 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
        >
          Add to Cart 🛒
        </button>
      </div>
    </div>
  );
}