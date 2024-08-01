import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { getAllOrders, getAllStocks, getDashboardData } from '../../services/AdminServices';
import { Box, Card, CardContent, Container, Grid, Paper, Typography } from '@mui/material';
import { ShoppingCart, Store, TrendingUp, People } from '@mui/icons-material';
import ReactApexChart from 'react-apexcharts';

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
    series: [
      {
        name: 'Orders',
        data: orders.map(order => order.quantity),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: orders.map(order => new Date(order.createdAt).toISOString()),
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
    },
  };

  const polarAreaData = {
    series: stock.map(item => item.inStock),
    options: {
      chart: {
        type: 'polarArea',
      },
      stroke: {
        colors: ['#fff'],
      },
      fill: {
        opacity: 0.8,
      },
      labels: stock.map(item => item.name),
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      }],
    },
  };

  const barChartData = {
    series: [{
      name: 'Stock Levels',
      data: stock.map(item => item.inStock),
    }],
    options: {
      annotations: {
        points: [{
          x: 'Bananas',
          seriesIndex: 0,
          label: {
            borderColor: '#775DD0',
            offsetY: 0,
            style: {
              color: '#fff',
              background: '#775DD0',
            },
            text: 'Bananas are good',
          },
        }],
      },
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: '50%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 0,
      },
      grid: {
        row: {
          colors: ['#fff', '#f2f2f2'],
        },
      },
      xaxis: {
        labels: {
          rotate: -45,
        },
        categories: stock.map(item => item.name),
        tickPlacement: 'on',
      },
      yaxis: {
        title: {
          text: 'Stock Levels',
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 0, 100],
        },
      },
    },
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" align="center" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, position: 'relative', overflow: 'hidden', borderRadius: 3 }}>
            <ShoppingCart sx={{ position: 'absolute', top: -10, right: -10, fontSize: '6rem', color: 'rgba(0, 0, 0, 0.1)' }} />
            <Typography variant="h6" sx={{ mb: 1 }}>Total Orders</Typography>
            <Typography variant="h4">{dashboardData.totalOrders}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, position: 'relative', overflow: 'hidden', borderRadius: 3 }}>
            <Store sx={{ position: 'absolute', top: -10, right: -10, fontSize: '6rem', color: 'rgba(0, 0, 0, 0.1)' }} />
            <Typography variant="h6" sx={{ mb: 1 }}>Total Stock</Typography>
            <Typography variant="h4">{dashboardData.totalStock}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, position: 'relative', overflow: 'hidden', borderRadius: 3 }}>
            <TrendingUp sx={{ position: 'absolute', top: -10, right: -10, fontSize: '6rem', color: 'rgba(0, 0, 0, 0.1)' }} />
            <Typography variant="h6" sx={{ mb: 1 }}>Orders Today</Typography>
            <Typography variant="h4">1</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, position: 'relative', overflow: 'hidden', borderRadius: 3 }}>
            <People sx={{ position: 'absolute', top: -10, right: -10, fontSize: '6rem', color: 'rgba(0, 0, 0, 0.1)' }} />
            <Typography variant="h6" sx={{ mb: 1 }}>New Users</Typography>
            <Typography variant="h4">5</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3 }}>Orders Over Time</Typography>
              <Box sx={{ height: 300 }}>
                <ReactApexChart options={ordersData.options} series={ordersData.series} type="area" height={300} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3 }}>Stock Levels</Typography>
              <Box sx={{ height: 300 }}>
                <ReactApexChart options={barChartData.options} series={barChartData.series} type="bar" height={300} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3 }}>Stock Distribution</Typography>
              <Box sx={{ height: 300 }}>
                <ReactApexChart options={polarAreaData.options} series={polarAreaData.series} type="polarArea" height={300} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
