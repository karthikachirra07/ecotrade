"use client";

import { useAuth } from "@/lib/auth-context";
import { useOrders } from "@/lib/orders-context";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, ShoppingBag, Zap, TrendingDown, Award, Sparkles, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { getUserAchievements, getRecommendedProducts } from "@/lib/data";

export default function ConsumerDashboard() {
  const { user } = useAuth();
  const { orders } = useOrders();
  const [achievements, setAchievements] = useState<any[]>([]);
  const [recommended, setRecommended] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    setAchievements(getUserAchievements(orders));
    setRecommended(getRecommendedProducts(orders, 4));
    
    const stored = localStorage.getItem("wishlist");
    if (stored) setWishlist(JSON.parse(stored));
  }, [orders]);

  const totalSpent = orders.reduce((sum: number, order: any) => sum + (order.totalAmount || 0), 0);
  const totalCarbonSaved = orders.reduce((sum: number, order: any) => sum + (order.carbonSaved || 0), 0);
  const totalOrders = orders.length;
  const profileComplete = user?.name && user?.pincode ? 100 : 50;

  return (
    <main className="mx-auto max-w-7xl p-6">
      {/* Welcome Section */}
      <section className="mb-12 rounded-3xl border border-border bg-gradient-to-r from-green-50 via-emerald-50 to-yellow-50 p-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-green-900">Welcome back, {user?.name}! 👋</h1>
            <p className="mt-2 text-green-800">You're making a real difference for our planet and local farmers.</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="rounded-full bg-green-200 px-4 py-1 text-sm font-semibold text-green-800">Profile {profileComplete}% Complete</span>
            <div className="h-2 w-32 rounded-full bg-gray-300">
              <div className="h-full rounded-full bg-green-600" style={{ width: `${profileComplete}%` }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: ShoppingBag, label: "Total Orders", value: totalOrders, Color: "blue" },
          { icon: TrendingDown, label: "Amount Spent", value: `₹${totalSpent}`, Color: "green" },
          { icon: Leaf, label: "Carbon Saved", value: `${totalCarbonSaved.toFixed(0)} kg`, Color: "emerald" },
          { icon: Zap, label: "My Location", value: user?.pincode || "Not set", Color: "yellow" },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="rounded-2xl hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="mt-2 text-2xl font-bold">{stat.value}</p>
                  </div>
                  <Icon className="h-8 w-8 text-green-700" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* Quick Actions */}
      <section className="mb-12 rounded-3xl border border-border bg-card p-6">
        <h2 className="mb-6 text-xl font-bold">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/products">
            <button className="w-full rounded-lg bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800">
              Browse Products
            </button>
          </Link>
          <Link href="/sellers">
            <button className="w-full rounded-lg border border-border px-6 py-3 font-semibold hover:bg-muted">
              Nearby Farmers
            </button>
          </Link>
          <Link href="/orders">
            <button className="w-full rounded-lg border border-border px-6 py-3 font-semibold hover:bg-muted">
              Order History
            </button>
          </Link>
        </div>
      </section>

      {/* Recent Orders */}
      <section className="rounded-3xl border border-border bg-card p-6">
        <h2 className="mb-6 text-xl font-bold">Recent Orders</h2>
        {orders.length === 0 ? (
          <div className="rounded-lg bg-muted p-6 text-center">
            <p className="text-muted-foreground">No orders yet. Start shopping to see your orders here!</p>
            <Link href="/products">
              <button className="mt-4 rounded-lg bg-green-700 px-6 py-2 text-white hover:bg-green-800">
                Shop Now
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.slice(-5).reverse().map((order: any) => (
              <div key={order.id} className="rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold">Order #{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-700">₹{order.totalAmount || 0}</p>
                    <p className="text-xs text-green-600">↓ {order.carbonSaved?.toFixed(0) || 0} kg CO2</p>
                  </div>
                </div>
                <p className="mt-2 text-sm">{order.items?.length || 0} items • Delivered</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}