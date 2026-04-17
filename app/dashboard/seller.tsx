"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Package, ShoppingBag, DollarSign, Trash2, AlertCircle, TrendingUp, Star } from "lucide-react";
import { EcoScore } from "@/components/eco-score";

export default function SellerDashboard() {
  const { user } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    ecoScore: "5",
    unit: "kg",
    quantity: "",
    category: "Vegetables",
  });

  useEffect(() => {
    const stored = localStorage.getItem("seller_products");
    if (stored) setProducts(JSON.parse(stored));
  }, []);

  const addProduct = () => {
    if (!form.name || !form.price || !form.quantity) {
      alert("Please fill in all required fields");
      return;
    }

    const newProduct = {
      id: Date.now(),
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity),
      ecoScore: Number(form.ecoScore),
      sellerId: user?.id || 1,
      sales: Math.floor(Math.random() * 50),
      revenue: Number(form.price) * Math.floor(Math.random() * 50),
      rating: (Math.random() * 0.5 + 4.3).toFixed(1),
    };

    const updated = [...products, newProduct];
    setProducts(updated);
    localStorage.setItem("seller_products", JSON.stringify(updated));

    setForm({
      name: "",
      description: "",
      price: "",
      ecoScore: "5",
      unit: "kg",
      quantity: "",
      category: "Vegetables",
    });
    setShowForm(false);
  };

  const deleteProduct = (id: number) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("seller_products", JSON.stringify(updated));
  };

  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  const totalRevenue = products.reduce((sum, p) => sum + (p.revenue || 0), 0);
  const totalSales = products.reduce((sum, p) => sum + (p.sales || 0), 0);
  const lowStockProducts = products.filter((p) => p.quantity < 5);
  const topProduct = products.reduce((max, p) => (p.sales || 0) > (max.sales || 0) ? p : max, {});
  const avgRating = products.length > 0 ? (products.reduce((sum, p) => sum + parseFloat(p.rating || 4.5), 0) / products.length).toFixed(1) : 0;

  return (
    <main className="mx-auto max-w-7xl p-6">
      {/* Welcome Section */}
      <section className="mb-12 rounded-3xl border border-border bg-gradient-to-r from-green-50 via-emerald-50 to-yellow-50 p-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-green-900">Welcome back, {user?.name}! 🌾</h1>
            <p className="mt-2 text-green-800">Manage your products, track sales, and grow your business.</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="rounded-full bg-green-200 px-4 py-1 text-sm font-semibold text-green-800">Success Rate: 98%</span>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Grid */}
      <section className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Package, label: "Total Products", value: totalProducts, Color: "blue" },
          { icon: DollarSign, label: "Revenue", value: `₹${totalRevenue}`, Color: "green" },
          { icon: ShoppingBag, label: "Total Sales", value: totalSales, Color: "emerald" },
          { icon: Star, label: "Avg Rating", value: `${avgRating} ⭐`, Color: "yellow" },
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

      {/* Alerts Section */}
      {lowStockProducts.length > 0 && (
        <section className="mb-12">
          <div className="rounded-3xl border border-orange-200 bg-orange-50 p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-orange-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-orange-900">Stock Alert</h3>
                <p className="mt-1 text-sm text-orange-800">{lowStockProducts.length} product(s) have low stock:</p>
                <div className="mt-3 flex gap-2 flex-wrap">
                  {lowStockProducts.map((p) => (
                    <span key={p.id} className="bg-orange-200 text-orange-800 px-3 py-1 rounded text-sm font-medium">
                      {p.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Top Performer Section */}
      {topProduct.name && (
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Top Performing Product ⭐</h2>
          <Card className="rounded-2xl border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg">{topProduct.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{topProduct.description}</p>
                  <div className="mt-4 grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Sales</p>
                      <p className="mt-1 text-2xl font-bold text-green-700">{topProduct.sales || 0}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Revenue</p>
                      <p className="mt-1 text-2xl font-bold text-green-700">₹{topProduct.revenue || 0}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Rating</p>
                      <p className="mt-1 text-2xl font-bold text-green-700">{topProduct.rating || 4.5} ⭐</p>
                    </div>
                  </div>
                </div>
                <EcoScore score={topProduct.ecoScore || 5} size="lg" />
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Add Product Section */}
      <section className="mb-12 rounded-3xl border border-border bg-card p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Products</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-lg bg-green-700 px-6 py-2 font-semibold text-white hover:bg-green-800"
          >
            {showForm ? "Cancel" : "+ Add Product"}
          </button>
        </div>

        {showForm && (
          <div className="mb-8 rounded-lg border border-border bg-muted/50 p-6">
            <h3 className="mb-4 font-semibold">Add New Product</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <input
                placeholder="Product Name *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-lg border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
              />
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="rounded-lg border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
              >
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Grains">Grains</option>
                <option value="Dairy">Dairy</option>
                <option value="Honey">Honey</option>
                <option value="Eggs">Eggs</option>
                <option value="Spices">Spices</option>
              </select>
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="col-span-2 rounded-lg border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
              />
              <input
                type="number"
                placeholder="Price per unit *"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="rounded-lg border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
              />
              <input
                type="number"
                placeholder="Quantity available *"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                className="rounded-lg border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
              />
              <select
                value={form.unit}
                onChange={(e) => setForm({ ...form, unit: e.target.value })}
                className="rounded-lg border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
              >
                <option value="kg">kg</option>
                <option value="litre">litre</option>
                <option value="dozen">dozen</option>
                <option value="bunch">bunch</option>
                <option value="piece">piece</option>
              </select>
              <select
                value={form.ecoScore}
                onChange={(e) => setForm({ ...form, ecoScore: e.target.value })}
                className="rounded-lg border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
              >
                <option value="5">Eco Score: 5 (Perfect)</option>
                <option value="4">Eco Score: 4 (Great)</option>
                <option value="3">Eco Score: 3 (Good)</option>
              </select>
              <button
                onClick={addProduct}
                className="col-span-2 rounded-lg bg-green-700 px-4 py-2 font-semibold text-white hover:bg-green-800"
              >
                Add Product
              </button>
            </div>
          </div>
        )}

        {/* Products List */}
        {products.length === 0 ? (
          <div className="rounded-lg bg-muted p-6 text-center">
            <p className="text-muted-foreground">No products yet. Add your first product to get started!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="flex items-start justify-between rounded-lg border border-border p-4 hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{product.name}</h3>
                    <EcoScore score={product.ecoScore || 5} size="sm" />
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium">
                      {product.sales || 0} sales
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>
                  <div className="mt-3 grid gap-6 md:grid-cols-5 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Price</p>
                      <p className="font-medium mt-1">₹{product.price}/{product.unit}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Stock</p>
                      <p className="font-medium mt-1 {product.quantity < 5 ? 'text-orange-600' : ''}">
                        {product.quantity} {product.unit}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Revenue</p>
                      <p className="font-medium text-green-700 mt-1">₹{product.revenue || 0}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Category</p>
                      <p className="font-medium mt-1">{product.category}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Rating</p>
                      <p className="font-medium mt-1">{product.rating || 4.5} ⭐</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="rounded-lg bg-red-100 p-3 text-red-700 hover:bg-red-200 ml-4 flex-shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}