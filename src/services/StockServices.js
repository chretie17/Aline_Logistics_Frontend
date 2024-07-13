import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const getAllStocks = (token) => {
  return api.get('/stocks', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createStock = (token, stockData) => {
  return api.post('/stocks', stockData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateStock = (token, stockId, stockData) => {
  return api.put(`/stocks/${stockId}`, stockData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteStock = (token, stockId) => {
  return api.delete(`/stocks/${stockId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
