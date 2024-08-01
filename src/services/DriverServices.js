import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Adjust the baseURL as necessary
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllDrivers = (token) => {
  return api.get('/drivers', {
    headers: { Authorization: `Bearer ${token}` },
  });
};
