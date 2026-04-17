"use client";

import { useAuth } from "@/lib/auth-context";
import SellerDashboard from "./seller";
import ConsumerDashboard from "./consumer";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return <p>Please login</p>;

  return user.role === "seller" ? (
    <SellerDashboard />
  ) : (
    <ConsumerDashboard />
  );
}