"use client";

import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" />
      <button>Login</button>
    </div>
  );
}