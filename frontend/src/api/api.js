// const API_BASE = "http://localhost:8000";
export const API_BASE = "http://192.168.178.163:8000";

// rest of your functions...


export async function login(username, password) {
  console.log("Logging in:", username);
  const res = await fetch(`${API_BASE}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ username, password }),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error("Login failed:", text);
    throw new Error("Login failed");
  }
  const data = await res.json();
  console.log("Login success, token:", data.access_token);
  return data.access_token;
}

export async function fetchPortfolio(token) {
  const res = await fetch(`${API_BASE}/portfolio`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch portfolio");
  return res.json();
}

export async function submitTrade(token, symbol, price) {
  const res = await fetch(`${API_BASE}/portfolio`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ symbol, price }),
  });
  if (!res.ok) throw new Error("Failed to submit trade");
  return res.json();
}
