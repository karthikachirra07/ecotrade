"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { getAllProducts, getCategories, getProductByCategory, sellers } from "@/lib/data";
import {
  Carrot,
  Apple,
  Flame,
  Croissant,
  Cake,
  Milk,
  Wheat,
  Bean,
  Droplet,
  Candy,
  Cherry,
} from "lucide-react";

const categoryIcons: Record<string, ReactNode> = {
  Vegetables: <Carrot className="h-8 w-8" />,
  Fruits: <Apple className="h-8 w-8" />,
  Spices: <Flame className="h-8 w-8" />,
  Bakery: <Croissant className="h-8 w-8" />,
  Cakes: <Cake className="h-8 w-8" />,
  Dairy: <Milk className="h-8 w-8" />,
  Grains: <Wheat className="h-8 w-8" />,
  Pulses: <Bean className="h-8 w-8" />,
  "Cooking Oil": <Droplet className="h-8 w-8" />,
  Sweeteners: <Candy className="h-8 w-8" />,
  "Dry Fruits": <Cherry className="h-8 w-8" />,
};

const categoryColors: Record<string, string> = {
  Vegetables: "bg-green-100 text-green-700 hover:bg-green-200",
  Fruits: "bg-red-100 text-red-700 hover:bg-red-200",
  Spices: "bg-orange-100 text-orange-700 hover:bg-orange-200",
  Bakery: "bg-amber-100 text-amber-700 hover:bg-amber-200",
  Cakes: "bg-pink-100 text-pink-700 hover:bg-pink-200",
  Dairy: "bg-blue-100 text-blue-700 hover:bg-blue-200",
  Grains: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
  Pulses: "bg-lime-100 text-lime-700 hover:bg-lime-200",
  "Cooking Oil": "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
  Sweeteners: "bg-purple-100 text-purple-700 hover:bg-purple-200",
  "Dry Fruits": "bg-rose-100 text-rose-700 hover:bg-rose-200",
};

export default function CategoriesPage() {
  const categories = getCategories();

  return (
    <main className="flex-1 mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">Browse by Category</h1>
        <p className="mt-2 text-muted-foreground">
          Find products from local sellers organized by category.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => {
          const products = getProductByCategory(category);
          const colorClass = categoryColors[category] || "bg-gray-100 text-gray-700 hover:bg-gray-200";
          const icon = categoryIcons[category] || <Carrot className="h-8 w-8" />;

          return (
            <Link key={category} href={`/products?category=${encodeURIComponent(category)}`}>
              <Card className={`overflow-hidden transition-all ${colorClass} border-0`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-white/50">{icon}</div>
                    <div>
                      <h3 className="font-semibold text-lg">{category}</h3>
                      <p className="text-sm opacity-80">
                        {products.length} product{products.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <section className="mt-16 rounded-2xl bg-muted p-8 text-center">
        <h2 className="text-2xl font-bold">Shop with Confidence</h2>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          All our sellers are verified and committed to providing quality products.
          Enjoy fresh, local goods delivered right to your doorstep.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div>
            <p className="text-4xl font-bold text-primary">{categories.length}</p>
            <p className="text-muted-foreground">Categories</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">{getAllProducts().length}</p>
            <p className="text-muted-foreground">Products</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">{sellers.length}</p>
            <p className="text-muted-foreground">Verified Sellers</p>
          </div>
        </div>
      </section>
    </main>
  );
}
