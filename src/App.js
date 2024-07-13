import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './auth/Login';
import Register from './auth/Register';
import ClientDashboard from './pages/client/ClientDashboard';
import StockManagerDashboard from './pages/stockManager/StockManagerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminManageStock from './pages/admin/AdminManageStock';
import ManageUsers from './pages/admin/ManageUsers';
import DriverDashboard from './pages/driver/DriverDashboard';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import ManageStock from './pages/stockManager/ManageStock';
import BrowseProducts from './pages/client/BrowseProduct';
import './App.css';

const App = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      import('./authenticated.css'); // Dynamically import authenticated styles
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className={`app-container ${user ? 'authenticated' : ''}`}>
      {!user && <Navbar />}
      {user && <Sidebar role={user.role} onLogout={handleLogout} />}
      <div className={user ? 'content-with-sidebar' : 'content'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute role="client" />}>
            <Route path="/client-dashboard" element={<ClientDashboard />} />
            <Route path="/browse-products" element={<BrowseProducts />} />

          </Route>
          <Route element={<ProtectedRoute role="driver" />}>
            <Route path="/driver-dashboard" element={<DriverDashboard />} />
          </Route>
          <Route element={<ProtectedRoute role="stockManager" />}>
            <Route path="/stock-manager-dashboard" element={<StockManagerDashboard />} />
            <Route path="/manage-stock" element={<ManageStock />} />
          </Route>
          <Route element={<ProtectedRoute role="admin" />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/manage-users" element={<ManageUsers />} />
            <Route path="/admin-manage-stock" element={<AdminManageStock />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

const AppWrapper = () => (
  <AuthProvider>
    <Router>
      <App />
    </Router>
  </AuthProvider>
);

export default AppWrapper;
