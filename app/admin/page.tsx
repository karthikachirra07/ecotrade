"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("ecotrade_users") || "[]");
    setUsers(stored);
  }, []);

  const updateStatus = (id: string, status: string) => {
    const updated = users.map((u) =>
      u.id === id ? { ...u, status } : u
    );

    setUsers(updated);
    localStorage.setItem("ecotrade_users", JSON.stringify(updated));
  };

  const sellers = users.filter((u) => u.role === "seller");

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard 👨‍💼</h1>

      {sellers.map((seller) => (
        <div key={seller.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{seller.name}</h3>
          <p>Status: {seller.status}</p>

          <button
            onClick={() => updateStatus(seller.id, "approved")}
            style={{ background: "green", color: "white", marginRight: "10px" }}
          >
            Approve ✅
          </button>

          <button
            onClick={() => updateStatus(seller.id, "rejected")}
            style={{ background: "red", color: "white" }}
          >
            Reject ❌
          </button>
        </div>
      ))}
    </div>
  );
}