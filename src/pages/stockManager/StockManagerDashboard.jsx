// src/pages/stockManager/StockManagerDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockManagerDashboard = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      const res = await axios.get('/api/stocks', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setStocks(res.data);
    };
    fetchStocks();
  }, []);

  return (
    <div>
      <h1>Stock Manager Dashboard</h1>
      <h2>Manage Stocks</h2>
      <ul>
        {stocks.map(stock => (
          <li key={stock.id}>
            {stock.name} - {stock.quantity} - {stock.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockManagerDashboard;
