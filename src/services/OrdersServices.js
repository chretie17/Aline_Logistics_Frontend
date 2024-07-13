import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createOrder = (token, orderData) => {
  return api.post('/orders', orderData, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
};
