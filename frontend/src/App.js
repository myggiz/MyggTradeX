import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import PortfolioList from "./components/PortfolioList";
import TradeForm from "./components/TradeForm";
import TradeAlerts from "./components/TradeAlerts";
import { login } from "./api/api";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleLogin = async (username, password) => {
    const token = await login(username, password);
    setToken(token);
    return token;
  };

  const refreshPortfolio = () => setRefreshFlag(!refreshFlag);

  if (!token) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div>
      <h1>Trading Dashboard</h1>
      <TradeAlerts />
      <PortfolioList token={token} key={refreshFlag} />
      <TradeForm token={token} onTradeSubmitted={refreshPortfolio} />
      <button onClick={() => { localStorage.removeItem("token"); setToken(null); }}>
        Logout
      </button>
    </div>
  );
}
