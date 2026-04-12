"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";

import {
  getAllProducts,
  getCategories,
  searchProducts,
  getSellersByPincode,
} from "@/lib/data";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [pincode, setPincode] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  const categories = useMemo(() => getCategories(), []);

  const filteredProducts = useMemo(() => {
    let products = searchQuery
      ? searchProducts(searchQuery)
      : getAllProducts();

    // Category filter
    if (selectedCategory) {
      products = products.filter((p) => p.category === selectedCategory);
    }

    // Pincode filter
    if (pincode) {
      const sellers = getSellersByPincode(pincode);
      const sellerIds = sellers.map((s) => s.id);
      products = products.filter((p) =>
        sellerIds.includes(p.sellerId)
      );
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        products = [...products].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        products = [...products].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        products = [...products].sort((a, b) => b.rating - a.rating);
        break;
      default:
        products = [...products].sort((a, b) => b.reviews - a.reviews);
    }

    return products;
  }, [searchQuery, selectedCategory, pincode, sortBy]);

  return (
    <div>
  

      <main style={{ padding: "20px" }}>
        <h1>All Products</h1>

        {/* 🔍 Search + Filters */}
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginRight: "10px" }}
          />

          <input
            type="text"
            placeholder="Enter pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            style={{ marginRight: "10px" }}
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ marginRight: "10px" }}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price Low → High</option>
            <option value="price-high">Price High → Low</option>
          </select>
        </div>

        {/* 🛍️ Products */}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p>No products found.</p>
        )}
      </main>

      <Footer />
    </div>
  );
}