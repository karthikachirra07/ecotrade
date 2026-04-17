"use client";

import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/lib/auth-context";
import { calculateAverageEcoScore, calculateCarbonSavings, calculateDistance } from "@/lib/data";
import { EcoScore } from "@/components/eco-score";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, increaseQty, decreaseQty, total } = useCart();
  const { user } = useAuth();

  const productIds = cart.map((item: any) => item.id);
  const avgEcoScore = calculateAverageEcoScore(productIds);
  
  const distance = user?.pincode ? calculateDistance(user.pincode, "500001") : 5;
  const carbonSavings = calculateCarbonSavings(distance);
  const deliveryCharge = Math.max(0, (distance - 5) * 2);

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="text-3xl font-bold">Your Cart 🛒</h1>

      {cart.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-border bg-muted p-12 text-center">
          <p className="text-muted-foreground">Your cart is empty. Start shopping!</p>
          <Link href="/products">
            <button className="mt-4 rounded-lg bg-primary px-6 py-2 text-primary-foreground">
              Browse Products
            </button>
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map((item: any) => (
                <div key={item.id} className="rounded-lg border border-border bg-card p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <div className="mt-2 flex items-center gap-2">
                        <EcoScore score={item.ecoScore} size="sm" />
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm text-destructive hover:underline"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <p className="font-semibold text-primary">₹{item.price}</p>
                    <div className="flex items-center gap-2 rounded-lg border border-border">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="px-3 py-2 hover:bg-muted"
                      >
                        −
                      </button>
                      <span className="px-4 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="px-3 py-2 hover:bg-muted"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            {/* Eco Score Summary */}
            <section className="rounded-3xl border border-border bg-card p-6">
              <h3 className="font-semibold">🌱 Eco Impact</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Average Eco Score</p>
                  <div className="mt-2">
                    <EcoScore score={Math.round(avgEcoScore)} size="lg" />
                  </div>
                </div>
                <div className="rounded-lg bg-green-50 p-4 text-sm">
                  <p className="font-semibold text-green-900">Carbon Saved</p>
                  <p className="mt-1 text-lg font-bold text-green-700">{carbonSavings.toFixed(2)} kg CO₂</p>
                  <p className="mt-2 text-xs text-green-600">
                    By buying local, you saved ~{carbonSavings.toFixed(0)} kg CO₂ vs supermarket chain!
                  </p>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>📦 Biodegradable packaging included</p>
                  <p>🚴 Bike delivery - zero emissions</p>
                  <p>📍 {distance.toFixed(1)} km from seller</p>
                </div>
              </div>
            </section>

            {/* Order Summary */}
            <section className="rounded-3xl border border-border bg-primary/5 p-6">
              <h3 className="font-semibold">Order Summary</h3>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery ({distance.toFixed(1)} km)</span>
                  <span className="font-medium">₹{deliveryCharge}</span>
                </div>
                <div className="border-t border-border pt-3 font-semibold">
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span className="text-lg text-primary">₹{total + deliveryCharge}</span>
                  </div>
                </div>
              </div>
              <Link href="/checkout">
                <button className="mt-4 w-full rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground hover:opacity-90">
                  Proceed to Checkout →
                </button>
              </Link>
            </section>
          </aside>
        </div>
      )}
    </main>
  );
}