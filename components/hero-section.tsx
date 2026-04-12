"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, ShoppingBag, Truck, Shield } from "lucide-react";

interface HeroSectionProps {
  onSearch: (query: string) => void;
  onPincodeChange: (pincode: string) => void;
}

export function HeroSection({ onSearch, onPincodeChange }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [pincode, setPincode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode) onPincodeChange(pincode);
    if (searchQuery) onSearch(searchQuery);
  };

  return (
    <section className="relative overflow-hidden bg-primary px-4 py-16 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.05),transparent_50%)]" />
      <div className="relative mx-auto max-w-4xl text-center">
        <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Shop Local, Support Your Community
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-foreground/80">
          Discover amazing products from trusted local sellers near you. Fresh groceries, artisan goods, and more delivered to your doorstep.
        </p>

        <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-2xl">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 w-full pl-12 text-base bg-card border-0 shadow-lg"
              />
            </div>
            <div className="relative w-full sm:w-40">
              <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="h-14 w-full pl-12 text-base bg-card border-0 shadow-lg"
                maxLength={6}
              />
            </div>
            <Button type="submit" size="lg" className="h-14 px-8 text-base bg-foreground text-primary hover:bg-foreground/90">
              Search
            </Button>
          </div>
        </form>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-foreground/70">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            <span className="text-sm font-medium">5+ Local Sellers</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            <span className="text-sm font-medium">Fast Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <span className="text-sm font-medium">Quality Guaranteed</span>
          </div>
        </div>
      </div>
    </section>
  );
}
