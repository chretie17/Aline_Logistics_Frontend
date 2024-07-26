import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { getAllOrders, getAllStocks, getDashboardData } from '../../services/AdminServices';
import { Card, CardContent, Typography, Grid, Container, Box, Paper } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import { css } from '@emotion/react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const styles = {
  root: css`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  `,
  card: css`
    border-radius: 15px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    padding: 10px;
  `,
  cardHeader: css`
    font-weight: bold;
    color: #3f51b5;
    margin-bottom: 10px;
  `,
  chartContainer: css`
    height: 300px;
  `,
  cardContent: css`
    text-align: center;
  `,
  paper: css`
    padding: 16px;
    text-align: center;
    color: #000;
    height: 150px;
  `,
};

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [stock, setStock] = useState([]);
  const [dashboardData, setDashboardData] = useState({ totalOrders: 0, totalStock: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const token = user.token;
      const ordersData = await getAllOrders(token);
      setOrders(ordersData.data);
      const stockData = await getAllStocks(token);
      setStock(stockData.data);
      const dashboardData = await getDashboardData(token);
      setDashboardData(dashboardData.data);
    };

    fetchData();
  }, [user]);

  const ordersData = {
    labels: orders.map(order => new Date(order.createdAt).toLocaleDateString()),
    datasets: [
      {
        label: 'Orders',
        data: orders.map(order => order.quantity),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const stockData = {
    labels: stock.map(item => item.name),
    datasets: [
      {
        label: 'Stock Quantity',
        data: stock.map(item => item.inStock),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: stock.map(item => item.name),
    datasets: [
      {
        label: 'Stock Distribution',
        data: stock.map(item => item.inStock),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container css={styles.root}>
      <Typography variant="h3" align="center" gutterBottom>Admin Dashboard</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper css={styles.paper}>
            <Typography variant="h6" css={styles.cardHeader}>Total Orders</Typography>
            <Typography variant="h4">{dashboardData.totalOrders}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper css={styles.paper}>
            <Typography variant="h6" css={styles.cardHeader}>Total Stock</Typography>
            <Typography variant="h4">{dashboardData.totalStock}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper css={styles.paper}>
            <Typography variant="h6" css={styles.cardHeader}>Orders Today</Typography>
            <Typography variant="h4">15</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper css={styles.paper}>
            <Typography variant="h6" css={styles.cardHeader}>New Users</Typography>
            <Typography variant="h4">5</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card css={styles.card}>
            <CardContent>
              <Typography variant="h5" css={styles.cardHeader}>Orders Over Time</Typography>
              <Box css={styles.chartContainer}>
                <Line data={ordersData} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card css={styles.card}>
            <CardContent>
              <Typography variant="h5" css={styles.cardHeader}>Stock Levels</Typography>
              <Box css={styles.chartContainer}>
                <Line data={stockData} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card css={styles.card}>
            <CardContent>
              <Typography variant="h5" css={styles.cardHeader}>Stock Distribution</Typography>
              <Box css={styles.chartContainer}>
                <Pie data={pieData} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
