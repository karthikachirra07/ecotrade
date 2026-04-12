"use client";
import { useState } from "react";
import Navbar from "../../components/navbar";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleLogin} style={{ textAlign: "center" }}>
        <h2>Login</h2>
        <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" /><br /><br />
        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" /><br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
