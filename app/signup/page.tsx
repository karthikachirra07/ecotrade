"use client";
import { useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    alert("Signup successful");
  };

  return (
    <div>
      <h2>Signup</h2>

      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <br />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}