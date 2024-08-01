import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
  Divider,
  Toolbar,
  Typography,
  Box,
  useMediaQuery,
  Switch
} from '@mui/material';
import { Home, People, ShoppingCart, LocalShipping, Assessment, ExitToApp, Menu, TextFields } from '@mui/icons-material';
import { styled } from '@mui/system';
import { AuthContext } from '../contexts/AuthContext';

const lightBlueTheme = {
  background: '#e3f2fd', // Light blue background
  text: '#0d47a1', // Dark blue text
  hover: '#bbdefb', // Lighter blue on hover
  icon: '#0d47a1', // Dark blue icons
  active: '#90caf9', // Blue for active links
};

const darkBlueTheme = {
  background: '#0d47a1', // Dark blue background
  text: '#ffffff', // White text
  hover: '#1565c0', // Darker blue on hover
  icon: '#ffffff', // White icons
  active: '#1976d2', // Blue for active links
};

const StyledDrawer = styled(Drawer)(({ theme, compact }) => ({
  '.MuiDrawer-paper': {
    backgroundColor: theme.background,
    color: theme.text,
    width: compact ? 80 : 250,
    transition: 'width 0.3s, background-color 0.3s, color 0.3s',
    overflowX: 'hidden',
  }
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme, compact }) => ({
  color: theme.icon,
  minWidth: compact ? 56 : 'auto',
  marginRight: compact ? 0 : '16px',
  justifyContent: 'center',
}));

const StyledListItemText = styled(ListItemText)(({ compact }) => ({
  display: compact ? 'none' : 'block',
  transition: 'display 0.3s',
}));

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  backgroundColor: active ? theme.active : 'inherit',
  '&:hover': {
    backgroundColor: theme.hover,
  },
  transition: 'background-color 0.3s',
}));

const Sidebar = ({ role }) => {
  const { user, setUser } = useContext(AuthContext);
  const [isCompact, setIsCompact] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const isMobile = useMediaQuery('(max-width:768px)');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleToggleCompact = () => {
    setIsCompact(!isCompact);
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
          { text: 'Dashboard', icon: <LocalShipping/>, link: '/driver-dashboard' },
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

  const theme = isDarkMode ? darkBlueTheme : lightBlueTheme;

  const drawerContent = (
    <Box display="flex" flexDirection="column" height="100%">
      <Toolbar>
        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
          <Box display="flex" alignItems="center">
            <IconButton color="inherit" aria-label="toggle drawer" onClick={handleToggleDrawer}>
              <Menu />
            </IconButton>
            {!isCompact && (
              <Typography variant="h6" noWrap>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </Typography>
            )}
          </Box>
          <Box display="flex" alignItems="center">
            <Tooltip title="Toggle Theme" arrow>
              <Switch checked={isDarkMode} onChange={handleToggleTheme} />
            </Tooltip>
            <Tooltip title="Toggle Compact View" arrow>
              
            </Tooltip>
          </Box>
        </Box>
      </Toolbar>
      <Divider />
      <List style={{ flexGrow: 1 }}>
        {getLinks().map(({ text, icon, link }) => (
          <Tooltip key={text} title={!isCompact ? "" : text} placement="right" arrow>
            <StyledListItem
              button
              component={Link}
              to={link}
              theme={theme}
              compact={isCompact}
              active={location.pathname === link ? 1 : 0}
              onClick={isMobile ? handleToggleDrawer : undefined}
            >
              <StyledListItemIcon theme={theme} compact={isCompact}>
                {icon}
              </StyledListItemIcon>
              <StyledListItemText primary={text} compact={isCompact} />
            </StyledListItem>
          </Tooltip>
        ))}
      </List>
      <Divider />
      <Box mb={2} textAlign="center">
        <Typography variant="body2" style={{ color: theme.text }}>
          {user?.name}
        </Typography>
        <Tooltip title="Logout" placement="right" arrow>
          <StyledListItem button onClick={handleLogout} theme={theme}>
            <StyledListItemIcon theme={theme}><ExitToApp /></StyledListItemIcon>
            <StyledListItemText primary="Logout" compact={isCompact} />
          </StyledListItem>
        </Tooltip>
      </Box>
    </Box>
  );

  return (
    <div>
      {isMobile && (
        <IconButton color="inherit" aria-label="open drawer" onClick={handleToggleDrawer} edge="start">
          <Menu />
        </IconButton>
      )}
      <StyledDrawer
        variant={isMobile ? "temporary" : "permanent"}
        anchor="left"
        open={isDrawerOpen || !isMobile}
        onClose={handleToggleDrawer}
        ModalProps={{
          keepMounted: true,
        }}
        theme={theme}
        compact={isCompact}
      >
        {drawerContent}
      </StyledDrawer>
    </div>
  );
};

export default Sidebar;
