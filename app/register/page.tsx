"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");

  return (
    <div className="p-10">
      <h1 className="text-2xl">Register Page ✅</h1>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mt-4"
      />
    </div>
  );
}