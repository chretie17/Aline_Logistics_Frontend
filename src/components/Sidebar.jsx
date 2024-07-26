import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { Home, People, ShoppingCart, LocalShipping, Assessment, ExitToApp, Menu } from '@mui/icons-material';
import { styled } from '@mui/system';

const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    background-color: #2c3e50; // Dark background color
    color: #ecf0f1; // Light text color
    width: 250px; // Adjust the width of the sidebar
  }
`;

const StyledListItem = styled(ListItem)`
  &:hover {
    background-color: #34495e; // Hover effect color
  }
`;

const StyledListItemIcon = styled(ListItemIcon)`
  color: #ecf0f1; // Light icon color
`;

const StyledTypography = styled(Typography)`
  color: #ecf0f1; // Light text color
`;

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

      case 'driver':
        return [
          { text: 'Dashboard', icon: <Home />, link: '/driver-dashboard' },
          { text: 'My Transportations', icon: <LocalShipping />, link: '/driver-transport' }
        ];
      case 'stockManager':
        return [
          { text: 'Dashboard', icon: <Home />, link: '/stock-manager-dashboard' },
          { text: 'Manage Stock', icon: <ShoppingCart />, link: '/manage-stock' },
          { text: 'Manage Orders', icon: <ShoppingCart />, link: '/manage-orders' },
        ];
      default:
        return [];
    }
  };

  if (role === 'client') {
    return null; // Do not render the sidebar for clients
  }

  const drawerContent = (
    <>
      <Toolbar>
        <StyledTypography variant="h6" noWrap>
          {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
        </StyledTypography>
        {isMobile && (
          <IconButton onClick={toggleDrawer}>
            <ExitToApp />
          </IconButton>
        )}
      </Toolbar>
      <Divider />
      <List>
        {getLinks().map(({ text, icon, link }) => (
          <StyledListItem button component={Link} to={link} key={text} onClick={isMobile ? toggleDrawer : undefined}>
            <StyledListItemIcon>{icon}</StyledListItemIcon>
            <ListItemText primary={text} />
          </StyledListItem>
        ))}
        <StyledListItem button onClick={handleLogout}>
          <StyledListItemIcon><ExitToApp /></StyledListItemIcon>
          <ListItemText primary="Logout" />
        </StyledListItem>
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
      <StyledDrawer
        variant={isMobile ? "temporary" : "permanent"}
        anchor="left"
        open={open || !isMobile}
        onClose={toggleDrawer}
        ModalProps={{
          keepMounted: true, 
        }}
      >
        {drawerContent}
      </StyledDrawer>
    </div>
  );
};

export default Sidebar;
