"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Leaf, Truck, TrendingDown, Users } from "lucide-react";

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("ecotrade_current_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("ecotrade_current_user");
    setUser(null);
  };

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#2D6A4F]/10 to-transparent px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2">
                <Leaf className="h-4 w-4 text-green-700" />
                <span className="text-xs font-semibold text-green-700">FARM TO TABLE • ZERO MIDDLEMEN</span>
              </div>
              <h1 className="text-5xl font-bold leading-tight">
                Support Local Farmers, <span className="text-green-700">Eat Fresh</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                EcoTrade connects you directly to local farmers. Get organic, pesticide-free produce delivered to your door with <strong>70% less carbon emissions</strong> than supermarket chains.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                {user ? (
                  <>
                    <Link href="/products">
                      <button className="rounded-lg bg-green-700 px-8 py-3 font-semibold text-white hover:bg-green-800">
                        Continue Shopping →
                      </button>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="rounded-lg border border-border px-8 py-3 font-semibold hover:bg-muted"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <button className="rounded-lg bg-green-700 px-8 py-3 font-semibold text-white hover:bg-green-800">
                        Login
                      </button>
                    </Link>
                    <Link href="/signup">
                      <button className="rounded-lg border border-border px-8 py-3 font-semibold hover:bg-muted">
                        Sign Up Free
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative h-96 rounded-3xl bg-gradient-to-br from-green-100 to-yellow-50 p-8">
                <div className="space-y-6">
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-sm font-semibold text-green-900">🥕 Fresh Vegetables</p>
                    <p className="text-xs text-muted-foreground">From local certified organic farms</p>
                  </div>
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-sm font-semibold text-green-900">🍯 Raw Honey & More</p>
                    <p className="text-xs text-muted-foreground">Unprocessed, natural, pesticide-free</p>
                  </div>
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-sm font-semibold text-green-900">🚴 Delivered Fresh</p>
                    <p className="text-xs text-muted-foreground">Bike delivery in biodegradable packaging</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="border-t border-border px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Why Choose EcoTrade?</h2>
            <p className="mt-2 text-muted-foreground">Better products. Happier farmers. Healthier planet.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: TrendingDown, title: "70% Less Carbon", desc: "Direct delivery vs supermarket supply chain" },
              { icon: Leaf, title: "Eco Score", desc: "Every product rated for sustainability" },
              { icon: Truck, title: "Next Day Delivery", desc: "Fresh from farm to your door" },
              { icon: Users, title: "Support Farmers", desc: "100% of proceeds go to growers" },
            ].map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="rounded-2xl border border-border bg-card p-6 text-center">
                  <Icon className="mx-auto h-8 w-8 text-green-700" />
                  <h3 className="mt-4 font-semibold">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-border bg-muted/50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold">How EcoTrade Works</h2>
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { step: 1, title: "Sign Up", desc: "Create account & set your location" },
              { step: 2, title: "Browse Products", desc: "See local farmers & fresh produce" },
              { step: 3, title: "Add to Cart", desc: "Check eco scores & ratings" },
              { step: 4, title: "Checkout", desc: "Get blockchain receipt & bike delivery" },
            ].map((item, idx) => (
              <div key={idx} className="relative text-center">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-700 text-white font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                {idx < 3 && (
                  <div className="absolute right-0 top-5 -translate-y-1/2 text-2xl text-muted-foreground">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border px-6 py-16">
        <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-gradient-to-r from-green-50 to-yellow-50 px-8 py-12 text-center">
          <h2 className="text-3xl font-bold text-green-900">Ready to Make an Impact?</h2>
          <p className="mt-4 text-green-800">Join thousands of eco-conscious consumers supporting local farmers.</p>
          {!user && (
            <Link href="/signup">
              <button className="mt-6 rounded-lg bg-green-700 px-8 py-3 font-semibold text-white hover:bg-green-800">
                Join EcoTrade Today
              </button>
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}