import React, { createContext, useState, useEffect } from 'react';
import { getUserProfile } from '../services/api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getUserProfile(token).then(profile => {
        setUser({ token, role: profile.data.role });
      }).catch(() => {
        localStorage.removeItem('token');
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
