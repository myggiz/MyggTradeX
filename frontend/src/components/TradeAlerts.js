import React, { useEffect, useState } from "react";

export default function TradeAlerts() {
  const [alerts, setAlerts] = useState([]);
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/alerts");

    ws.onmessage = (event) => {
      setAlerts((prev) => [event.data, ...prev]);
    };

    return () => ws.close();
  }, []);

  return (
    <div>
      <h2>Trade Alerts</h2>
      <ul>
        {alerts.map((alert, idx) => (
          <li key={idx}>{alert}</li>
        ))}
      </ul>
    </div>
  );
}
