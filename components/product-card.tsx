"use client";

import { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "15px",
        width: "250px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      {/* Product Name */}
      <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>
        {product.name}
      </h3>

      {/* Description */}
      <p style={{ fontSize: "14px", color: "#555" }}>
        {product.description}
      </p>

      {/* Price */}
      <p style={{ fontWeight: "bold", marginTop: "5px" }}>
        ₹{product.price} / {product.unit}
      </p>

      {/* Eco Score */}
      <p>🌱 Eco Score: {product.ecoScore}/10</p>

      {/* Rating */}
      <p>⭐ {product.rating} ({product.reviews} reviews)</p>

      {/* Stock */}
      {product.inStock ? (
        <button
          style={{
            marginTop: "10px",
            backgroundColor: "#16a34a",
            color: "white",
            padding: "8px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Buy Now
        </button>
      ) : (
        <p style={{ color: "red", marginTop: "10px" }}>
          Out of Stock
        </p>
      )}
    </div>
  );
}