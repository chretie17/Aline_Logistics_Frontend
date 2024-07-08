// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('/api/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setUser({ token, role: res.data.role }))
      .catch(() => localStorage.removeItem('token'));
    }
  }, []);

  const login = async (email, password) => {
    const res = await axios.post('/api/users/login', { email, password });
    const token = res.data.token;
    localStorage.setItem('token', token);
    const { role } = JSON.parse(atob(token.split('.')[1]));
    setUser({ token, role });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
