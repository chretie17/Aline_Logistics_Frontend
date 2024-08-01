import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { getOrdersByDriver, markOrderAsDelivered } from '../../services/OrdersServices';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Box,
  Tooltip,
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)`
  background-color: #f5f5f5;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledButton = styled(Button)`
  margin-right: 10px;
`;

const DriverDashboard = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchDriverOrders = async () => {
      try {
        console.log('Attempting to fetch orders for driver:', user.id);
        const ordersData = await getOrdersByDriver(user.token, user.id);
        console.log('Orders successfully fetched:', ordersData);
  
        // Check and set orders based on the correct data structure
        if (ordersData.data && Array.isArray(ordersData.data.data)) {
          console.log('Setting orders state with fetched data:', ordersData.data.data);
          setOrders(ordersData.data.data); // Adjusted to access the correct array
        } else {
          console.error('Unexpected data format received for orders:', ordersData);
        }
      } catch (error) {
        console.error('Error occurred while fetching driver orders:', error);
      }
    };
  
    if (user) {
      console.log('Driver user detected:', user);
      fetchDriverOrders();
    } else {
      console.log('No driver user found.');
    }
  }, [user]);
  
  
  const handleMarkAsDelivered = async (orderId) => {
    try {
      console.log('Initiating marking of order as delivered. Order ID:', orderId);
      await markOrderAsDelivered(user.token, orderId);
      console.log('Order successfully marked as delivered. Updating state.');
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: 'Order Delivered', orderDeliveredAt: new Date().toISOString() } : order
      ));
    } catch (error) {
      console.error('Error occurred while marking order as delivered:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>Driver Dashboard</Typography>
      <Grid container spacing={2}>
        {orders.length > 0 ? (
          orders.map(order => (
            <Grid item xs={12} key={order.id}>
              <StyledCard>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="h6">Order #{order.id}</Typography>
                      <Typography>Product Name: {order.product?.name}</Typography>
                      <Typography>Quantity: {order.quantity}</Typography>
                      <Typography>Status: {order.status}</Typography>
                      {order.status === 'Order Delivered' && (
                        <Typography>Delivered At: {new Date(order.orderDeliveredAt).toLocaleString()}</Typography>
                      )}
                    </Box>
                    {order.status !== 'Order Delivered' && (
                      <Tooltip title="Mark as Delivered">
                        <StyledButton
                          variant="contained"
                          color="primary"
                          onClick={() => handleMarkAsDelivered(order.id)}
                          startIcon={<CheckCircle />}
                        >
                          Mark as Delivered
                        </StyledButton>
                      </Tooltip>
                    )}
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          ))
        ) : (
          <Typography align="center" style={{ marginTop: 20 }}>
            No orders assigned to you currently.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default DriverDashboard;
