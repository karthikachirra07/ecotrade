"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("ecotrade_current_user");
    if (user) {
      router.push("/products");
    }
  }, [router]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await login(email, password);
    if (res.success) {
      router.push("/products"); // ✅ redirect to products
    } else {
      alert(res.error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back 👋</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button style={styles.button} onClick={handleLogin}>
          Login 🚀
        </button>

        <p style={{ textAlign: "center", color: "white", fontSize: "14px" }}>
          Don't have an account? <a href="/signup" style={{ color: "#00c853", textDecoration: "none" }}>Sign up</a>
        </p>
      </div>
    </div>
  );
}

const styles: any = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    animation: "fadeIn 1s ease-in",
  },

  card: {
    padding: "30px",
    borderRadius: "15px",
    backdropFilter: "blur(10px)",
    background: "rgba(255,255,255,0.1)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "300px",
    animation: "slideUp 0.8s ease",
  },

  title: {
    textAlign: "center",
    color: "white",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    transition: "0.3s",
  },

  button: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#00c853",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },
};