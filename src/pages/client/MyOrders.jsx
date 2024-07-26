import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { getOrdersByUser, cancelOrder } from '../../services/OrdersServices';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  CircularProgress,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Cancel, TrackChanges } from '@mui/icons-material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '20px',
});

const StyledCard = styled(Card)({
  borderRadius: '15px',
  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
});

const StyledCardHeader = styled(Typography)({
  fontWeight: 'bold',
  color: '#3f51b5',
  marginBottom: '10px',
});

const StyledButton = styled(Button)({
  marginRight: '10px',
});

const EmptyMessage = styled(Typography)({
  textAlign: 'center',
  marginTop: '50px',
  color: '#9e9e9e',
});

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const response = await getOrdersByUser(user.token, user.id);
        console.log('Fetched Orders Response:', response);
        const ordersData = response.data.data; // Accessing the array of orders
        if (Array.isArray(ordersData)) {
          setOrders(ordersData);
        } else {
          console.error('Orders data is not an array:', ordersData);
          setOrders([]);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const handleOpenCancelDialog = (orderId) => {
    setSelectedOrderId(orderId);
    setOpenCancelDialog(true);
  };

  const handleCloseCancelDialog = () => {
    setOpenCancelDialog(false);
    setSelectedOrderId(null);
  };

  const handleCancelOrder = async () => {
    try {
      await cancelOrder(user.token, selectedOrderId);
      setOrders(orders.map(order => 
        order.id === selectedOrderId ? { ...order, status: 'Cancelled' } : order
      ));
      handleCloseCancelDialog();
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  if (loading) {
    return (
      <StyledContainer>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <CircularProgress />
        </Box>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <Typography variant="h4" align="center" gutterBottom>My Orders</Typography>
      {orders.length === 0 ? (
        <EmptyMessage variant="h6">You have no orders.</EmptyMessage>
      ) : (
        <Grid container spacing={2}>
          {orders.map(order => (
            <Grid item xs={12} key={order.id}>
              <StyledCard>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                      <StyledCardHeader variant="h6">Order #{order.id}</StyledCardHeader>
                      <Typography>Product Name: {order.product.name}</Typography>
                      <Typography>Category: {order.product.category}</Typography>
                      <Typography>Quantity: {order.quantity}</Typography>
                      <Typography>Status: {order.status}</Typography>
                    </Box>
                    <Box>
                      <StyledButton 
                        variant="contained" 
                        color="primary" 
                        onClick={() => navigate(`/order-tracking/${order.id}`)}
                        startIcon={<TrackChanges />}
                        disabled={order.status === 'Cancelled' || order.status === 'Delivered'}
                      >
                        Track Order
                      </StyledButton>
                      <StyledButton 
                        variant="contained" 
                        color="secondary" 
                        onClick={() => handleOpenCancelDialog(order.id)}
                        startIcon={<Cancel />}
                        disabled={order.status === 'Cancelled' || order.status === 'Delivered'}
                      >
                        Cancel Order
                      </StyledButton>
                    </Box>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={openCancelDialog} onClose={handleCloseCancelDialog}>
        <DialogTitle>Cancel Order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel this order?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancelDialog} color="primary">
            No
          </Button>
          <Button onClick={handleCancelOrder} color="secondary">
            Yes, Cancel Order
          </Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
};

export default MyOrders;
