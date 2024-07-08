// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = (userData) => {
  return api.post('/users/register', userData);
};

export const loginUser = (userData) => {
  return api.post('/users/login', userData);
};

export const getUserProfile = (token) => {
  return api.get('/users/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
};
