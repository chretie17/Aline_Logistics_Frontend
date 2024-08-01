import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',  
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createOrder = (token, orderData) => {
  return api.post('/orders', orderData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


export const getOrdersByUser = (token, userId) => {
  return api.get(`/orders/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const cancelOrder = (token, orderId) => {
  return api.put(`/orders/cancel/${orderId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const getAllOrders = (token) => {
  return api.get('/orders', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateOrderStatus = (token, orderId, data) => {
  return api.put(`/orders/${orderId}/status`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const assignOrderToDriver = (token, orderId, driverId) => {
  return api.put(`/orders/${orderId}/assign`, { driverId }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


export const getOrderDetails = (token, orderId) => {
  return api.get(`/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteOrder = (token, orderId) => {
  return api.delete(`/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const getOrdersByDriver = (token, driverId) => {
  return api.get(`/orders/driver/${driverId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const markOrderAsDelivered = (token, orderId) => {
  return api.put(`/orders/mark-delivered/${orderId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
