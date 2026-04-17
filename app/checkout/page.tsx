"use client";

import { useCart } from "@/hooks/useCart";
import { useOrders } from "@/lib/orders-context";
import { useAuth } from "@/lib/auth-context";
import { blockchain } from "@/lib/blockchain";
import { calculateDistance, calculateCarbonSavings } from "@/lib/data";
import Link from "next/link";
import { useState } from "react";

export default function CheckoutPage() {
  const { cart, clearCart, total } = useCart();
  const { addOrder } = useOrders();
  const { user } = useAuth();
  const [txHash, setTxHash] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const distance = user?.pincode ? calculateDistance(user.pincode, "500001") : 5;
  const carbonSavings = calculateCarbonSavings(distance);
  const deliveryCharge = Math.max(0, (distance - 5) * 2);
  const finalTotal = total + deliveryCharge;

  const handlePayment = async () => {
    setLoading(true);

    try {
      const productIds = cart.map((item: any) => item.id);
      
      const transaction = blockchain.createTransaction({
        from: user?.email || "consumer@ecotrade.local",
        to: "seller@ecotrade.local",
        amount: finalTotal,
        productIds: productIds,
      });

      setTxHash(transaction.txHash);

      const order = {
        id: transaction.blockNumber,
        items: cart,
        date: new Date().toLocaleString(),
        txHash: transaction.txHash,
        totalAmount: finalTotal,
        carbonSaved: carbonSavings,
        distance: distance,
      };

      addOrder(order);
      clearCart();
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <main className="mx-auto max-w-2xl p-6">
        <div className="rounded-3xl border border-border bg-muted p-12 text-center">
          <p className="text-muted-foreground">Your cart is empty</p>
          <Link href="/products">
            <button className="mt-4 rounded-lg bg-primary px-6 py-2 text-primary-foreground">
              Continue Shopping
            </button>
          </Link>
        </div>
      </main>
    );
  }

  if (txHash) {
    return (
      <main className="mx-auto max-w-2xl p-6">
        <div className="rounded-3xl border-2 border-green-500 bg-green-50 p-12 text-center">
          <h1 className="text-3xl font-bold text-green-900">✅ Payment Successful!</h1>
          <p className="mt-4 text-green-800">Your order has been placed securely.</p>

          <div className="mt-8 rounded-lg border border-green-200 bg-white p-6 text-left">
            <h2 className="font-semibold">Transaction Receipt</h2>
            
            <div className="mt-4 space-y-3 border-t border-green-200 pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction Hash</span>
                <code className="break-all font-mono text-xs">{txHash}</code>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Items</span>
                <span>{cart.length} product(s)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-semibold">₹{finalTotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Distance</span>
                <span>{distance.toFixed(1)} km</span>
              </div>
              <div className="flex justify-between bg-green-50 p-3 rounded">
                <span className="text-green-900 font-semibold">Carbon Saved</span>
                <span className="text-green-900 font-bold">{carbonSavings.toFixed(2)} kg CO₂</span>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <Link href="/orders">
              <button className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90">
                View Order Status
              </button>
            </Link>
            <Link href="/products">
              <button className="w-full rounded-lg border border-primary px-6 py-3 font-semibold text-primary hover:bg-primary/5">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-3xl font-bold">Checkout 💳</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <div className="space-y-6">
            {/* Order Items */}
            <div className="rounded-3xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4">Order Items</h2>
              <div className="space-y-3">
                {cart.map((item: any) => (
                  <div key={item.id} className="flex justify-between border-b border-border pb-3 last:border-b-0">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Eco Impact */}
            <div className="rounded-3xl border border-border bg-green-50 p-6">
              <h2 className="text-lg font-semibold text-green-900 mb-4">🌱 Eco Impact Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-800">Carbon Emission Saved</span>
                  <span className="font-semibold text-green-900">{carbonSavings.toFixed(2)} kg CO₂</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-800">Biodegradable Packaging</span>
                  <span className="font-semibold text-green-900">Included</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-800">Delivery Mode</span>
                  <span className="font-semibold text-green-900">🚴 Bike (Zero Emissions)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside>
          <div className="rounded-3xl border border-border bg-primary/5 p-6 sticky top-6">
            <h3 className="font-semibold mb-4">Payment Summary</h3>
            
            <div className="space-y-3 border-b border-border pb-4 mb-4 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery ({distance.toFixed(1)} km)</span>
                <span>₹{deliveryCharge}</span>
              </div>
            </div>

            <div className="mb-6 font-semibold text-lg">
              <div className="flex justify-between">
                <span>Total</span>
                <span className="text-primary">₹{finalTotal}</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Complete Payment"}
            </button>

            <p className="mt-4 text-xs text-muted-foreground">
              ✓ Secure blockchain transaction
              <br />
              ✓ 100% original products
              <br />✓ Direct from local farmers
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}