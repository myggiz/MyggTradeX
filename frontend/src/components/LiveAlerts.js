import React, { useEffect, useState } from "react";

export default function LiveAlerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/alerts");

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      setAlerts((prevAlerts) => [event.data, ...prevAlerts]);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = (event) => {
      console.log("WebSocket closed:", event.code, event.reason);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 320,
        maxHeight: 400,
        overflowY: "auto",
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: 4,
        padding: 10,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
        zIndex: 1000,
      }}
    >
      <h4 style={{ margin: "0 0 10px 0" }}>Live Alerts</h4>
      {alerts.length === 0 && <p>No alerts yet</p>}
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {alerts.map((alert, idx) => (
          <li
            key={idx}
            style={{
              backgroundColor: "#f9f9f9",
              padding: "8px 10px",
              marginBottom: 8,
              borderRadius: 3,
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            {alert}
          </li>
        ))}
      </ul>
    </div>
  );
}
