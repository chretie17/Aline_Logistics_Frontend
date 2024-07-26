import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { getOrderDetails } from '../../services/OrdersServices';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  CircularProgress,
  LinearProgress,
  Box,
  Tooltip,
} from '@mui/material';

const OrderTracking = () => {
  const { user } = useContext(AuthContext);
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderData = await getOrderDetails(user.token, orderId);
        setOrder(orderData.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [user, orderId]);

  if (!order) {
    return (
      <Container>
        <Typography>Loading...</Typography>
        <CircularProgress />
      </Container>
    );
  }

  const getStatusDate = (status) => {
    switch (status) {
      case 'Order Created':
        return order.createdAt;
      case 'Order Accepted':
        return order.orderAcceptedAt;
      case 'Order Packed':
        return order.orderPackedAt;
      case 'Order Shipped':
        return order.orderShippedAt;
      case 'Order Delivered':
        return order.orderDeliveredAt;
      default:
        return null;
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
  };

  const statusStages = [
    'Order Created',
    'Order Accepted',
    'Order Packed',
    'Order Shipped',
    'Order Delivered',
  ];

  const currentStageIndex = statusStages.findIndex((stage) => stage === order.status);

  const progressPercentage = ((currentStageIndex + 1) / statusStages.length) * 100;

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Order Tracking
      </Typography>
      <Typography variant="h6" align="center">
        Order Number #{orderId}
      </Typography>
      <Box my={4}>
        <LinearProgress variant="determinate" value={progressPercentage} />
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Ordered Products
              </Typography>
              {order.product && (
                <div>
                  <Typography variant="h6">{order.product.name}</Typography>
                  {order.product.image && (
                    <img
                      src={order.product.image}
                      alt={order.product.name}
                      style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
                    />
                  )}
                  <Typography>Quantity: {order.quantity}</Typography>
                </div>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Track Your Package
              </Typography>
              <Stepper activeStep={currentStageIndex} orientation="vertical">
                {statusStages.map((status, index) => (
                  <Step key={status}>
                    <Tooltip title={getStatusDate(status) ? formatDate(getStatusDate(status)) : 'Not available'}>
                      <StepLabel>{status}</StepLabel>
                    </Tooltip>
                    <StepContent>
                      <Typography variant="body2" color={currentStageIndex >= index ? 'textPrimary' : 'textSecondary'}>
                        {getStatusDate(status) ? formatDate(getStatusDate(status)) : '---'}
                      </Typography>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderTracking;
