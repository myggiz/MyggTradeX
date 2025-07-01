import React, { useState } from "react";
import { API_BASE } from "../api/api";

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log("whats going on", { username, password });
    try {
      const token = await onLogin(username, password);
      localStorage.setItem("token", token);
    } catch {
      setError("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export async function login(username, password) {
  console.log("Starting login fetch");
  const res = await fetch(`${API_BASE}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ username, password }),
  });
  console.log("Fetch completed with status:", res.status);
  if (!res.ok) {
    const err = await res.text();
    console.error("Login API error:", err);
    throw new Error("Login failed");
  }
  const data = await res.json();
  return data.access_token;
}
