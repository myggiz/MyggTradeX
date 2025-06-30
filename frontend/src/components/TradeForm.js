import React, { useState } from "react";

export default function TradeForm({ token, onTradeSubmitted }) {
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  const submitTrade = async () => {
    try {
      await fetch("/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ symbol, price: parseFloat(price) }),
      });
      setMessage("Trade submitted!");
      onTradeSubmitted();
    } catch {
      setMessage("Error submitting trade.");
    }
  };

  return (
    <div>
      <input
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        placeholder="Symbol"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
      />
      <button onClick={submitTrade}>Submit Trade</button>
      <p>{message}</p>
    </div>
  );
}
