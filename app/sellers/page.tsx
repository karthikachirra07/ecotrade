"use client";

import { useMemo, useState } from "react";
import { SellerCard } from "@/components/seller-card";
import { sellers, getSellersByPincode } from "@/lib/data";
import { useAuth } from "@/lib/auth-context";
import { Search, MapPin } from "lucide-react";

export default function SellersPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPincode, setFilterPincode] = useState("");

  const filteredSellers = useMemo(() => {
    let result = filterPincode ? getSellersByPincode(filterPincode) : [...sellers];

    if (searchQuery) {
      const query = (searchQuery || "").toLowerCase();
      result = result.filter(
        (seller: any) =>
          (seller.name || "").toLowerCase().includes(query) ||
          (seller.city || "").toLowerCase().includes(query)
      );
    }
    return result;
  }, [searchQuery, filterPincode]);

  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Local Farmers & Sellers</h1>
        <p className="mt-2 text-muted-foreground">
          Buy directly from farmers near you. Fresh, organic, sustainable.
        </p>
      </div>

      {/* Search & Filter Section */}
      <div className="mb-8 rounded-3xl border border-border bg-card p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="relative">
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search farmers by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Filter by pincode (optional)"
              value={filterPincode}
              onChange={(e) => setFilterPincode(e.target.value)}
              className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>
        </div>

        {user?.pincode && (
          <p className="mt-4 text-sm text-muted-foreground">
            📍 Your location: {user.pincode} • Showing distance to each farmer
          </p>
        )}
      </div>

      {/* Sellers Grid */}
      {filteredSellers.length === 0 ? (
        <div className="rounded-3xl border border-border bg-muted p-12 text-center">
          <p className="text-muted-foreground">No sellers found. Try adjusting your search.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSellers.map((seller) => (
            <SellerCard key={seller.id} seller={seller} userPincode={user?.pincode} />
          ))}
        </div>
      )}
    </main>
  );
}