import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { getAllOrders, updateOrderStatus, assignOrderToDriver, deleteOrder } from '../../services/OrdersServices';
import { getAllDrivers } from '../../services/DriverServices';
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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Tooltip,
} from '@mui/material';
import { CheckCircle, Assignment, Delete } from '@mui/icons-material';
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


const ManageOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedDriverId, setSelectedDriverId] = useState('');
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    const fetchOrdersAndDrivers = async () => {
      try {
        const ordersData = await getAllOrders(user.token);
        setOrders(Array.isArray(ordersData.data) ? ordersData.data : []);
  
        const driversData = await getAllDrivers(user.token);
        console.log('Drivers raw response:', driversData);
        console.log('Drivers data:', driversData.data);
  
        // Access the nested array correctly
        if (Array.isArray(driversData.data.data)) {
          setDrivers(driversData.data.data);
        } else {
          console.error('Expected an array for drivers data:', driversData.data.data);
        }
      } catch (error) {
        console.error('Error fetching orders or drivers:', error);
      }
    };
  
    if (user) {
      fetchOrdersAndDrivers();
    }
  }, [user]);
  
  
  
  
  const handleAcceptOrder = async (orderId) => {
    try {
      await updateOrderStatus(user.token, orderId, { status: 'Order Accepted' });
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: 'Order Accepted', orderAcceptedAt: new Date().toISOString() } : order
      ));
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };

  const handleOpenStatusDialog = (orderId) => {
    setSelectedOrderId(orderId);
    setOpenStatusDialog(true);
  };

  const handleCloseStatusDialog = () => {
    setOpenStatusDialog(false);
    setSelectedOrderId(null);
    setNewStatus('');
  };

  const handleUpdateOrderStatus = async () => {
    try {
      await updateOrderStatus(user.token, selectedOrderId, { status: newStatus });
      setOrders(orders.map(order =>
        order.id === selectedOrderId ? { ...order, status: newStatus, [`${newStatus.replace(' ', '')}At`]: new Date().toISOString() } : order
      ));
      handleCloseStatusDialog();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleOpenAssignDialog = (orderId) => {
    setSelectedOrderId(orderId);
    setOpenAssignDialog(true);
  };

  const handleCloseAssignDialog = () => {
    setOpenAssignDialog(false);
    setSelectedOrderId(null);
    setSelectedDriverId('');
  };

  const handleAssignOrderToDriver = async () => {
    try {
      await assignOrderToDriver(user.token, selectedOrderId, selectedDriverId);
      setOrders(orders.map(order =>
        order.id === selectedOrderId ? { ...order, driverId: selectedDriverId } : order
      ));
      handleCloseAssignDialog();
    } catch (error) {
      console.error('Error assigning order to driver:', error);
    }
  };
  
  const handleOpenDeleteDialog = (orderId) => {
    setSelectedOrderId(orderId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedOrderId(null);
  };

  const handleDeleteOrder = async () => {
    try {
      await deleteOrder(user.token, selectedOrderId);
      setOrders(orders.filter(order => order.id !== selectedOrderId));
      handleCloseDeleteDialog();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>Manage Orders</Typography>
      <Grid container spacing={2}>
        {orders.map(order => (
          <Grid item xs={12} key={order.id}>
            <StyledCard>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h6">Order #{order.id}</Typography>
                    <Typography>Product Name: {order.productName}</Typography>
                    <Typography>Quantity: {order.quantity}</Typography>
                    <Typography>Status: {order.status}</Typography>
                    <Typography>Assigned Driver: {drivers.find(driver => driver.id === order.driverId)?.name || 'None'}</Typography>
                  </Box>
                  <Box>
                    <Tooltip title="Accept Order">
                      <StyledButton
                        variant="contained"
                        color="primary"
                        onClick={() => handleAcceptOrder(order.id)}
                        startIcon={<CheckCircle />}
                      >
                        Accept
                      </StyledButton>
                    </Tooltip>
                    <Tooltip title="Update Status">
                      <StyledButton
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpenStatusDialog(order.id)}
                        startIcon={<CheckCircle />}
                      >
                        Update
                      </StyledButton>
                    </Tooltip>
                    <Tooltip title="Assign Driver">
                      <StyledButton
                        variant="contained"
                        color="secondary"
                        onClick={() => handleOpenAssignDialog(order.id)}
                        startIcon={<Assignment />}
                      >
                        Assign
                      </StyledButton>
                    </Tooltip>
                    <Tooltip title="Delete Order">
                      <StyledButton
                        variant="contained"
                        color="error"
                        onClick={() => handleOpenDeleteDialog(order.id)}
                        startIcon={<Delete />}
                      >
                        Delete
                      </StyledButton>
                    </Tooltip>
                  </Box>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openStatusDialog} onClose={handleCloseStatusDialog}>
        <DialogTitle>Update Order Status</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select the new status for this order.
          </DialogContentText>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <MenuItem value="Order Accepted">Order Accepted</MenuItem>
              <MenuItem value="Order Packed">Order Packed</MenuItem>
              <MenuItem value="Order Shipped">Order Shipped</MenuItem>
              <MenuItem value="Order Delivered">Order Delivered</MenuItem>
              <MenuItem value="Order Cancelled">Order Cancelled</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStatusDialog} color="primary">
            Close
          </Button>
          <Button onClick={handleUpdateOrderStatus} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAssignDialog} onClose={handleCloseAssignDialog}>
        <DialogTitle>Assign Order to Driver</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select a driver to assign this order to.
          </DialogContentText>
          <FormControl fullWidth margin="normal">
  <InputLabel>Driver</InputLabel>
  <Select
    value={selectedDriverId}
    onChange={(e) => setSelectedDriverId(e.target.value)}
  >
    {drivers.length > 0 ? (
      drivers.map((driver) => (
        <MenuItem key={driver.id} value={driver.id}>
          {driver.name}
        </MenuItem>
      ))
    ) : (
      <MenuItem value="" disabled>No drivers available</MenuItem>
    )}
  </Select>
</FormControl>




        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAssignDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAssignOrderToDriver} color="secondary">
            Assign
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this order? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteOrder} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageOrders;
