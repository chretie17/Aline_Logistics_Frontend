// src/pages/admin/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [transports, setTransports] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get('/api/admin/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(res.data);
    };

    const fetchOrders = async () => {
      const res = await axios.get('/api/admin/orders', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setOrders(res.data);
    };

    const fetchTransports = async () => {
      const res = await axios.get('/api/admin/transports', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTransports(res.data);
    };

    fetchUsers();
    fetchOrders();
    fetchTransports();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Manage Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email} - {user.role}
          </li>
        ))}
      </ul>
      <h2>Manage Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            {order.productId} - {order.quantity} - {order.status}
          </li>
        ))}
      </ul>
      <h2>Manage Transports</h2>
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

export default AdminDashboard;
