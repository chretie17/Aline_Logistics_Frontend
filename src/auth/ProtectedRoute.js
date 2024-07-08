// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = ({ role }) => {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== role) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="dashboard">
      <Sidebar role={user.role} />
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
