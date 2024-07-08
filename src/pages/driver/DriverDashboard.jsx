// src/pages/driver/DriverDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DriverDashboard = () => {
  const [transports, setTransports] = useState([]);

  useEffect(() => {
    const fetchTransports = async () => {
      const res = await axios.get('/api/transport', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTransports(res.data);
    };
    fetchTransports();
  }, []);

  return (
    <div>
      <h1>Driver Dashboard</h1>
      <h2>Your Transports</h2>
      <ul>
        {transports.map(transport => (
          <li key={transport.id}>
            Order ID: {transport.orderId} - Status: {transport.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DriverDashboard;
