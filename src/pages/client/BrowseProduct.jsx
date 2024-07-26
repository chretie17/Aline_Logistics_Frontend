import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { getAllStocks } from '../../services/StockServices';
import { createOrder } from '../../services/OrdersServices';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  IconButton,
  Badge,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { Delete, ShoppingCart, AddShoppingCart } from '@mui/icons-material';
import styled, { keyframes } from 'styled-components';

const zoomIn = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
`;

const ZoomImage = styled.img`
  transition: transform 0.2s ease-in-out;
  &:hover {
    animation: ${zoomIn} 0.2s forwards;
  }
`;

const FloatingCartButton = styled(IconButton)`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  &:hover {
    background-color: #f0f0f0;
  }
  font-size: 2rem;
`;

const BrowseProduct = () => {
  const { user } = useContext(AuthContext);
  const [stocks, setStocks] = useState([]);
  const [cart, setCart] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartAnchorEl, setCartAnchorEl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.token) {
        const stocksData = await getAllStocks(user.token);
        setStocks(stocksData.data);
      }
    };

    fetchData();
  }, [user]);

  const handleAddToCart = () => {
    if (selectedProduct) {
      setCart([...cart, { ...selectedProduct, quantity: Number(quantity) }]);
      setOpenDialog(false);
    }
  };

  const handleRemoveFromCart = (index) => {
    const newCart = cart.slice();
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handleCheckout = async () => {
    try {
      if (!user || !user.id) {
        throw new Error('User is not authenticated');
      }

      const token = user.token;
      for (const item of cart) {
        const orderData = {
          productId: item.id,
          quantity: Number(item.quantity),
          userId: user.id,
        };
        await createOrder(token, orderData);
      }

      setCart([]);
      console.log('Order created successfully');
    } catch (error) {
      console.error('Error creating order:', error.response?.data || error.message);
    }
  };

  const openBuyDialog = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setOpenDialog(true);
  };

  const handleCartClick = (event) => {
    setCartAnchorEl(event.currentTarget);
  };

  const handleCartClose = () => {
    setCartAnchorEl(null);
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: 'bold', marginBottom: '30px' }}>
        Browse Products
      </Typography>
      <Grid container spacing={4}>
        {stocks.map((stock) => (
          <Grid item xs={12} sm={6} md={4} key={stock.id}>
            <Card style={{ boxShadow: '0 3px 6px rgba(0,0,0,0.1)', transition: 'all 0.3s', borderRadius: '10px' }}>
              {stock.image && (
                <ZoomImage
                  src={`data:image/jpeg;base64,${stock.image}`}
                  alt={stock.name}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
              )}
              <CardContent style={{ padding: '20px' }}>
                <Typography variant="h5" component="div" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                  {stock.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{ marginBottom: '5px' }}>
                  Category: {stock.category}
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{ marginBottom: '5px' }}>
                  UPC: {stock.upc}
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{ marginBottom: '5px' }}>
                  Incoming Row: {stock.incomingRow}
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{ marginBottom: '5px' }}>
                  Price: Rwf{stock.price}
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{ marginBottom: '5px' }}>
                  In Stock: {stock.inStock}
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{ marginBottom: '10px' }}>
                  Status: {stock.status}
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{ marginBottom: '10px' }}>
                  {stock.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => openBuyDialog(stock)}
                  style={{ width: '100%', padding: '10px', fontWeight: 'bold' }}
                  startIcon={<AddShoppingCart />}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <FloatingCartButton onClick={handleCartClick}>
        <Badge badgeContent={cart.length} color="secondary">
          <ShoppingCart fontSize="large" />
        </Badge>
      </FloatingCartButton>

      <Dialog open={Boolean(cartAnchorEl)} onClose={handleCartClose}>
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
      </Dialog>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Buy Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            How many units of {selectedProduct?.name} would you like to add to the cart?
          </DialogContentText>
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddToCart} variant="contained" color="primary">
            Add to Cart
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BrowseProduct;
