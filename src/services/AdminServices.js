import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllUsers = (token) => {
  return api.get('/admin/users', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createUser = (token, userData) => {
  return api.post('/admin/users', userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateUser = (token, userId, userData) => {
  return api.put(`/admin/users/${userId}`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteUser = (token, userId) => {
  return api.delete(`/admin/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};



export const createOrder = (token, orderData) => {
  return api.post('/admin/orders', orderData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateOrder = (token, orderId, orderData) => {
  return api.put(`/admin/orders/${orderId}`, orderData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteOrder = (token, orderId) => {
  return api.delete(`/admin/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAllTransports = (token) => {
  return api.get('/admin/transports', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createTransport = (token, transportData) => {
  return api.post('/admin/transports', transportData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateTransport = (token, transportId, transportData) => {
  return api.put(`/admin/transports/${transportId}`, transportData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteTransport = (token, transportId) => {
  return api.delete(`/admin/transports/${transportId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getReports = (token) => {
  return api.get('/admin/reports', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAllOrders = (token) => {
  return api.get('/orders', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAllStocks = (token) => {
  return api.get('/stocks', {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const getDashboardData = (token) => {
  return api.get('/admin/dashboard-data', {
    headers: { Authorization: `Bearer ${token}` },
  });
};