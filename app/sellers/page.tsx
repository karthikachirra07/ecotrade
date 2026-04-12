"use client";


import { useState, useMemo } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SellerCard } from "@/components/seller-card";
import { sellers, getSellersByPincode } from "@/lib/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function SellersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [pincode, setPincode] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  const filteredSellers = useMemo(() => {
    let result = pincode ? getSellersByPincode(pincode) : [...sellers];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.description.toLowerCase().includes(query) ||
          s.city.toLowerCase().includes(query)
      );
    }

    // Sorting
    switch (sortBy) {
      case "rating":
        result = result.sort((a, b) => b.rating - a.rating);
        break;
      case "orders":
        result = result.sort((a, b) => b.totalOrders - a.totalOrders);
        break;
      case "products":
        result = result.sort((a, b) => b.products.length - a.products.length);
        break;
      case "newest":
        result = result.sort(
          (a, b) => new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime()
        );
        break;
    }

    return result;
  }, [searchQuery, pincode, sortBy]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        pincode={pincode}
        onPincodeChange={setPincode}
      />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">All Sellers</h1>
            <p className="mt-2 text-muted-foreground">
              {pincode
                ? `Showing ${filteredSellers.length} sellers near pincode ${pincode}`
                : `Browse ${filteredSellers.length} trusted local sellers`}
            </p>
          </div>

          {/* Sort Controls */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredSellers.length} sellers found
            </p>
            <div className="flex items-center gap-2">
              <Label htmlFor="sort" className="text-sm whitespace-nowrap">
                Sort by:
              </Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort" className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="orders">Most Orders</SelectItem>
                  <SelectItem value="products">Most Products</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Sellers Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSellers.map((seller) => (
              <SellerCard key={seller.id} seller={seller} />
            ))}
          </div>

          {filteredSellers.length === 0 && (
            <div className="rounded-lg border-2 border-dashed p-12 text-center">
              <p className="text-muted-foreground">
                No sellers found. Try a different search or pincode.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
