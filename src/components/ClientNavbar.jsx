import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.jpg';
import {
  Brand,
  BrandImage,
  Container,
  NavLink,
  Menu,
  MenuItems,
  Nav,
  MobileMenu,
  MobileMenuContainer,
  MobileMenuHover,
  LogoutButton,
} from './NavbarStyle';
import { AuthContext } from '../contexts/AuthContext';
import Typography from '@mui/material/Typography';
import { IconButton, Badge, Menu as MuiMenu, MenuItem as MuiMenuItem, Box, List, ListItem, ListItemText, Divider, Button } from '@mui/material';
import { ShoppingCart, Delete } from '@mui/icons-material';

const ClientNavbar = ({ cart = [], handleRemoveFromCart, handleCheckout }) => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const screenSize = 580;
  const [menu, setMenu] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [cartAnchorEl, setCartAnchorEl] = useState(null);

  window.addEventListener('resize', (e) => {
    if (e.target.innerWidth < screenSize) {
      setMenu(true);
    } else {
      setMenu(false);
    }
  });

  useEffect(() => {
    if (window.innerWidth < screenSize) setMenu(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const handleCartClick = (event) => {
    setCartAnchorEl(event.currentTarget);
  };

  const handleCartClose = () => {
    setCartAnchorEl(null);
  };

  const clientLinks = [
    { title: 'Home', link: '/' },
    { title: 'Products', link: '/browse-products' },
    { title: 'My Orders', link: '/my-orders' },
    { title: 'Feedback', link: '/feedback' },
  ];

  if (user && user.role !== 'client') {
    return null;
  }

  return (
    <Nav>
      <Container ss={screenSize}>
        <Brand>
          <BrandImage src={logo} alt="logo" />
          <Typography variant="h6" style={{ color: '#fff' }}>
            {user ? 'Client' : 'LDMS '}
          </Typography>
        </Brand>
        <MobileMenuContainer
          menu={menu}
          onClick={() => setToggleMenu(!toggleMenu)}
        >
          <MobileMenu />
          <MobileMenuHover />
        </MobileMenuContainer>
        <Menu toggleMenu={toggleMenu} ss={screenSize}>
          {user ? (
            clientLinks.map((item, index) => (
              <MenuItems key={index} toggleMenu={toggleMenu} ss={screenSize}>
                <NavLink to={item.link}>{item.title}</NavLink>
              </MenuItems>
            ))
          ) : (
            <>
              <MenuItems toggleMenu={toggleMenu} ss={screenSize}>
                <NavLink to="/">Home</NavLink>
              </MenuItems>
              <MenuItems toggleMenu={toggleMenu} ss={screenSize}>
                <NavLink to="/about">About</NavLink>
              </MenuItems>
              <MenuItems toggleMenu={toggleMenu} ss={screenSize}>
                <NavLink to="/contact">Contact</NavLink>
              </MenuItems>
              <MenuItems toggleMenu={toggleMenu} ss={screenSize}>
                <NavLink to="/login">Login</NavLink>
              </MenuItems>
            </>
          )}
        </Menu>
        {user && (
          <>
              
            <MuiMenu
              anchorEl={cartAnchorEl}
              open={Boolean(cartAnchorEl)}
              onClose={handleCartClose}
            >
              <Box sx={{ minWidth: 300, padding: '10px' }}>
                <Typography variant="h6" gutterBottom>
                  Cart
                </Typography>
                <List>
                  {cart.length === 0 ? (
                    <Typography variant="body2" color="textSecondary">
                      Your cart is empty.
                    </Typography>
                  ) : (
                    cart.map((item, index) => (
                      <ListItem key={index} style={{ padding: '10px 0' }}>
                        <ListItemText
                          primary={`${item.name} - ${item.quantity} pcs`}
                          secondary={`Price: Rwf${item.price * item.quantity}`}
                        />
                        <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFromCart(index)}>
                          <Delete />
                        </IconButton>
                      </ListItem>
                    ))
                  )}
                </List>
                {cart.length > 0 && (
                  <>
                    <Divider style={{ margin: '20px 0' }} />
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ width: '100%', padding: '10px', fontWeight: 'bold' }}
                      onClick={() => {
                        handleCheckout();
                        handleCartClose();
                      }}
                    >
                      Checkout
                    </Button>
                  </>
                )}
              </Box>
            </MuiMenu>
            <LogoutButton onClick={handleLogout}>
              Logout
            </LogoutButton>
          </>
        )}
      </Container>
    </Nav>
  );
};

export default ClientNavbar;
