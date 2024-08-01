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
  Box,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/system';
import { CheckCircle } from '@mui/icons-material';

// Styled components
const StyledContainer = styled(Container)`
  padding-top: 2rem;
`;

const StyledCard = styled(Card)`
  background-color: #f9f9f9;
  margin: 1rem 0;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
`;

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const OrderActions = styled(Box)`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;

  button {
    margin-left: 0.5rem;
  }
`;

const DriverDashboard = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDriverOrders = async () => {
      try {
        const ordersData = await getOrdersByDriver(user.token, user.id);
        if (ordersData.data && Array.isArray(ordersData.data)) {
          setOrders(ordersData.data);
        }
      } catch (error) {
        console.error('Error occurred while fetching driver orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDriverOrders();
    }
  }, [user]);

  const handleMarkAsDelivered = async (orderId) => {
    try {
      await updateOrderStatus(user.token, orderId, { status: 'Order Delivered' });
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: 'Order Delivered', orderDeliveredAt: new Date().toISOString() } : order
      ));
    } catch (error) {
      console.error('Error marking order as delivered:', error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <StyledContainer maxWidth="lg">
      <Header>
        <Typography variant="h4">Driver Dashboard</Typography>
        <Typography variant="h6">Welcome, {user.name}</Typography>
      </Header>
      <Grid container spacing={3}>
        {orders.length > 0 ? (
          orders.map(order => (
            <Grid item xs={12} key={order.id}>
              <StyledCard>
                <CardContent>
                  <Box display="flex" justifyContent="space-between">
                    <Box>
                      <Typography variant="h6">Order #{order.id}</Typography>
                      <Typography>Product ID: {order.productId}</Typography>
                      <Typography>Quantity: {order.quantity}</Typography>
                      <Typography>Status: {order.status}</Typography>
                    </Box>
                    <OrderActions>
                      <Tooltip title="Mark as Delivered">
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleMarkAsDelivered(order.id)}
                          startIcon={<CheckCircle />}
                          disabled={order.status === 'Order Delivered'}
                        >
                          Mark as Delivered
                        </Button>
                      </Tooltip>
                    </OrderActions>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" align="center">
            No orders assigned.
          </Typography>
        )}
      </Grid>
    </StyledContainer>
  );
};

export default DriverDashboard;
