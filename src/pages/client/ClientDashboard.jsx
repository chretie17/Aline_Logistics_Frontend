// src/pages/client/ClientDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get('/api/orders', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Client Dashboard</h1>
      <h2>Your Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            {order.productId} - {order.quantity} - {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientDashboard;
