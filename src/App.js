import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import ClientNavbar from './components/ClientNavbar'; // Import ClientNavbar
import Sidebar from './components/Sidebar'; // Import Sidebar
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './auth/Login';
import Register from './auth/Register';
import ClientDashboard from './pages/client/ClientDashboard';
import MyOrders from './pages/client/MyOrders';
import OrderTracking from './pages/client/OrderTracking';
import StockManagerDashboard from './pages/stockManager/StockManagerDashboard';
import ManageOrders from './pages/stockManager/ManageOrders';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminManageStock from './pages/admin/AdminManageStock';
import ManageUsers from './pages/admin/ManageUsers';
import DriverDashboard from './pages/driver/DriverDashboard';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import ManageStock from './pages/stockManager/ManageStock';
import BrowseProducts from './pages/client/BrowseProduct';
import Feedback from './pages/client/Feedback';
import './App.css'; // General styles

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
      <ClientNavbar /> {/* Always use ClientNavbar */}
      {user && user.role !== 'client' && <Sidebar role={user.role} onLogout={handleLogout} />} {/* Sidebar for non-clients */}
      <div className={user && user.role !== 'client' ? 'content-with-sidebar' : 'content'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute role="client" />}>
            <Route path="/client-dashboard" element={<ClientDashboard />} />
            <Route path="/browse-products" element={<BrowseProducts />} />
            <Route path="/order-tracking" element={<OrderTracking />} />
            <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/feedback" element={<Feedback />} />

          </Route>
          <Route element={<ProtectedRoute role="driver" />}>
            <Route path="/driver-dashboard" element={<DriverDashboard />} />
          </Route>
          <Route element={<ProtectedRoute role="stockManager" />}>
            <Route path="/stock-manager-dashboard" element={<StockManagerDashboard />} />
            <Route path="/manage-stock" element={<ManageStock />} />
            <Route path="/manage-orders" element={<ManageOrders />} />
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
