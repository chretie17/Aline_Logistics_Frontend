import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { getOrdersByDriver, updateOrderStatus } from '../../services/OrdersServices';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Box
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

const DriverDashboard = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getOrdersByDriver(user.token, user.id);
        setOrders(ordersData.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await updateOrderStatus(user.token, orderId, { status });
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status } : order
      ));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>My Assigned Orders</Typography>
      <Grid container spacing={2}>
        {orders.map(order => (
          <Grid item xs={12} key={order.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h6">Order #{order.id}</Typography>
                    <Typography>Product ID: {order.productId}</Typography>
                    <Typography>Quantity: {order.quantity}</Typography>
                    <Typography>Status: {order.status}</Typography>
                  </Box>
                  <Box>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={() => handleUpdateOrderStatus(order.id, 'Delivered')}
                      style={{ marginRight: '10px' }}
                      startIcon={<CheckCircle />}
                      disabled={order.status === 'Delivered'}
                    >
                      Mark as Delivered
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DriverDashboard;
