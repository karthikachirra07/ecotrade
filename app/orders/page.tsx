"use client";

import { useOrders } from "@/lib/orders-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function OrdersPage() {
  const { orders } = useOrders();

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="text-3xl font-bold">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-border bg-muted p-12 text-center">
          <p className="text-muted-foreground">No orders yet.</p>
          <Link href="/products">
            <button className="mt-4 rounded-lg bg-primary px-6 py-2 text-primary-foreground">
              Start Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6">
          {orders.map((order: any) => (
            <Card key={order.id} className="rounded-3xl">
              <CardHeader className="bg-card border-b">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Order #{order.id}</CardTitle>
                    <p className="mt-2 text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">₹{order.totalAmount || 0}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-3 font-semibold">Items Ordered</h3>
                    <div className="space-y-2">
                      {order.items.map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span>{item.name} ({item.quantity})</span>
                          <span className="font-medium">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {order.txHash && (
                      <div className="rounded-lg border border-border bg-muted p-4">
                        <h3 className="mb-2 text-sm font-semibold">Transaction Receipt</h3>
                        <div className="space-y-2 text-xs">
                          <div>
                            <p className="text-muted-foreground">Hash</p>
                            <code className="break-all font-mono text-xs">{order.txHash.substring(0, 32)}...</code>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Block</p>
                            <p className="font-medium">#{order.id}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {order.carbonSaved && (
                      <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                        <p className="text-xs font-semibold text-green-900">Carbon Saved</p>
                        <p className="mt-1 text-lg font-bold text-green-700">{order.carbonSaved.toFixed(2)} kg CO2</p>
                        <p className="mt-1 text-xs text-green-600">Distance: {order.distance?.toFixed(1) || 'N/A'} km</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}