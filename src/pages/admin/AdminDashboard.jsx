import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { getAllOrders, getReports } from '../../services/AdminServices';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import Chart from 'chart.js/auto';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = user.token;
      const ordersData = await getAllOrders(token);
      setOrders(ordersData.data);
      const reportsData = await getReports(token);
      setReports(reportsData.data);
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    if (orders.length > 0) {
      const ctx = document.getElementById('ordersChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: orders.map(order => order.id),
          datasets: [{
            label: 'Orders',
            data: orders.map(order => order.amount), // Assume 'amount' is a field in the Order model
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [orders]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <Typography variant="h3" align="center" gutterBottom>Admin Dashboard</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>Orders</Typography>
              <canvas id="ordersChart" style={{ width: '100%', height: '400px' }}></canvas>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>Reports</Typography>
              <Typography>{reports.message}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
