import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { Home, People, ShoppingCart, LocalShipping, Assessment, ExitToApp, Menu } from '@mui/icons-material';

const Sidebar = ({ role, onLogout }) => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:768px)');
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    if (typeof onLogout === 'function') {
      onLogout();
      navigate('/login');
    } else {
      console.error('onLogout is not a function');
    }
  };

  const getLinks = () => {
    switch (role) {
      case 'admin':
        return [
          { text: 'Dashboard', icon: <Home />, link: '/admin-dashboard' },
          { text: 'Manage Users', icon: <People />, link: '/manage-users' },
          { text: 'Manage Stock', icon: <ShoppingCart />, link: '/admin-manage-stock' },
          { text: 'Manage Orders', icon: <ShoppingCart />, link: '/manage-orders' },
          { text: 'Manage Transports', icon: <LocalShipping />, link: '/manage-transports' },
          { text: 'Manage Reports', icon: <Assessment />, link: '/manage-reports' },
        ];
      case 'client':
        return [
          { text: 'Dashboard', icon: <Home />, link: '/client-dashboard' },
          { text: 'Products', icon: <ShoppingCart />, link: '/browse-products' },
          { text: 'My Orders', icon: <ShoppingCart />, link: '/client-orders' },
          { text: 'Feedback', icon: <Assessment />, link: '/client-feedback' }
        ];
      case 'driver':
        return [
          { text: 'Dashboard', icon: <Home />, link: '/driver-dashboard' },
          { text: 'My Transportations', icon: <LocalShipping />, link: '/driver-transport' }
        ];
      case 'stockManager':
        return [
          { text: 'Dashboard', icon: <Home />, link: '/stock-manager-dashboard' },
          { text: 'Manage Stock', icon: <ShoppingCart />, link: '/manage-stock' },
          { text: 'Manage Purchases', icon: <ShoppingCart />, link: '/manage-purchases' },
          { text: 'Manage Sales', icon: <ShoppingCart />, link: '/manage-sales' }
        ];
      default:
        return [];
    }
  };

  const drawerContent = (
    <>
      <Toolbar>
        <Typography variant="h6" noWrap>
          {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
        </Typography>
        {isMobile && (
          <IconButton onClick={toggleDrawer}>
            <ExitToApp />
          </IconButton>
        )}
      </Toolbar>
      <Divider />
      <List>
        {getLinks().map(({ text, icon, link }) => (
          <ListItem button component={Link} to={link} key={text} onClick={isMobile ? toggleDrawer : undefined}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        <ListItem button onClick={handleLogout}>
          <ListItemIcon><ExitToApp /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </>
  );

  return (
    <div>
      {isMobile && (
        <IconButton color="inherit" aria-label="open drawer" onClick={toggleDrawer} edge="start">
          <Menu />
        </IconButton>
      )}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        anchor="left"
        open={open || !isMobile}
        onClose={toggleDrawer}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {drawerContent}
      </Drawer>
    </div>
  );
};

export default Sidebar;
