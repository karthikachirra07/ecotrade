"use client";

import { useState, useMemo } from "react";
import { Footer } from "@/components/footer";
import { SellerCard } from "@/components/seller-card";
import { sellers, getSellersByPincode } from "@/lib/data";

export default function SellersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [pincode, setPincode] = useState("");

  const filteredSellers = useMemo(() => {
    let result = pincode ? getSellersByPincode(pincode) : [...sellers];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (sellers:any) =>
          sellers.name.toLowerCase().includes(query) ||
          sellers.city.toLowerCase().includes(query)
      );
    }

    return result;
  }, [searchQuery, pincode]);

  return (
    <div>
      <main style={{ padding: "20px" }}>
        <h1>All Sellers</h1>

        {/* 🔍 Search */}
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search sellers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginRight: "10px" }}
          />

          <input
            type="text"
            placeholder="Enter pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
        </div>

        {/* 🧑 Sellers */}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {filteredSellers.map((seller) => (
            <SellerCard key={seller.id} seller={seller} />
          ))}
        </div>

        {filteredSellers.length === 0 && (
          <p>No sellers found.</p>
        )}
      </main>

      <Footer />
    </div>
  );
}