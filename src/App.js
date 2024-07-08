import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './auth/login';
import Register from './auth/Register';
import ClientDashboard from './pages/client/ClientDashboard';
import StockManagerDashboard from './pages/stockManager/StockManagerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import DriverDashboard from './pages/driver/DriverDashboard';
import { AuthContext } from './contexts/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import './App.css'; // General styles

const App = () => {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      import('./authenticated.css'); // Dynamically import authenticated styles
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <Router>
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
            </Route>
            <Route element={<ProtectedRoute role="driver" />}>
              <Route path="/driver-dashboard" element={<DriverDashboard />} />
            </Route>
            <Route element={<ProtectedRoute role="stockManager" />}>
              <Route path="/stock-manager-dashboard" element={<StockManagerDashboard />} />
            </Route>
            <Route element={<ProtectedRoute role="admin" />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/manage-users" element={<ManageUsers />} />
              {/* Add routes for managing orders and transports here */}
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
