import React, { useEffect, useState } from "react";

export default function PortfolioList({ token }) {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    fetch("/api/portfolio", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setPortfolio)
      .catch(console.error);
  }, [token]);

  return (
    <div>
      <h2>Portfolio</h2>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>Status</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.map((trade) => (
            <tr key={trade.id}>
              <td>{trade.symbol}</td>
              <td>{trade.price}</td>
              <td>{trade.status}</td>
              <td>{new Date(trade.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
