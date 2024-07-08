// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import ClientDashboard from './pages/client/ClientDashboard';
import StockManagerDashboard from './pages/stockManager/StockManagerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import DriverDashboard from './pages/driver/DriverDashboard';
import { AuthContext } from './contexts/AuthContext';

const App = () => {
  const { user } = useContext(AuthContext);

  const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <div className="dashboard">
            <Sidebar role={user.role} />
            <Component {...props} />
          </div>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <ProtectedRoute path="/client-dashboard" component={ClientDashboard} />
        <ProtectedRoute path="/stock-manager-dashboard" component={StockManagerDashboard} />
        <ProtectedRoute path="/admin-dashboard" component={AdminDashboard} />
        <ProtectedRoute path="/driver-dashboard" component={DriverDashboard} />
      </Switch>
    </Router>
  );
};

export default App;
