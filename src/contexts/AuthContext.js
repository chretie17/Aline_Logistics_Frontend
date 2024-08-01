import React, { createContext, useState, useEffect } from 'react';
import { getUserProfile } from '../services/api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getUserProfile(token)
        .then(profile => {
          setUser({ 
            token, 
            id: profile.data.id,
            role: profile.data.role 
          });
        })
        .catch(() => {
          localStorage.removeItem('token');
        })
        .finally(() => {
          setLoading(false); // Stop loading once profile is fetched or failed
        });
    } else {
      setLoading(false); // Stop loading if no token is found
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optionally render a loading indicator
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
