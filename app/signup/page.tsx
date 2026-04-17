"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  type FormType = {
    name: string;
    email: string;
    password: string;
    role: "consumer" | "seller";
    pincode: string;
    city: string;
  };

  const [form, setForm] = useState<FormType>({
    name: "",
    email: "",
    password: "",
    role: "consumer",
    pincode: "",
    city: "",
  });

  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");
    setLoading(true);

    // Validation
    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    if (form.role === "consumer" && !form.pincode) {
      setError("Please enter your pincode for delivery location");
      setLoading(false);
      return;
    }

    if (form.role === "seller" && !form.city) {
      setError("Please enter your city");
      setLoading(false);
      return;
    }

    try {
      const res = await register(form);

      if (res.success) {
        router.push("/products");
      } else {
        setError(res.error || "Signup failed");
      }
    } catch (err) {
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 px-6 py-12">
      <div className="mx-auto max-w-md">
        <div className="rounded-3xl border border-border bg-white p-8 shadow-lg">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Join EcoTrade</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {form.role === "consumer" ? "Support local farmers" : "Sell your produce directly"}
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <input
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-700"
            />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-700"
            />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-700"
            />

            {/* Role Selection */}
            <div className="rounded-lg border border-border bg-muted p-3">
              <label className="text-xs font-semibold text-muted-foreground">Account Type</label>
              <select
                value={form.role}
                onChange={(e) =>
                  setForm({
                    ...form,
                    role: e.target.value as FormType["role"],
                    pincode: "",
                    city: "",
                  })
                }
                className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
              >
                <option value="consumer">🛒 Consumer - Buy Fresh Produce</option>
                <option value="seller">🌾 Seller - Sell Your Produce</option>
              </select>
            </div>

            {/* Location Fields Based on Role */}
            {form.role === "consumer" ? (
              <input
                placeholder="Your Pincode (for delivery)"
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-700"
              />
            ) : (
              <input
                placeholder="Your City"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-700"
              />
            )}

            <button
              onClick={handleSignup}
              disabled={loading}
              className="mt-6 w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white hover:bg-green-800 disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <div className="border-t border-border pt-4 text-center text-sm">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-green-700 hover:underline">
                  Login here
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-green-50 p-4 text-xs text-green-900">
            <p className="font-semibold">✓ 100% Secure</p>
            <p className="mt-1">Your personal information is encrypted and never shared.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
