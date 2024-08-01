import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { Typography, Container, Card, CardContent, Grid } from '@mui/material';
import ReactApexChart from 'react-apexcharts';

const StockManagerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [lowStockData, setLowStockData] = useState([]);
  const [pendingOrdersData, setPendingOrdersData] = useState([]);

  useEffect(() => {
    if (user) {
      axios.get('http://localhost:3000/api/dash/products/low-stock', {
        headers: { Authorization: `Bearer ${user.token}` },
      }).then(response => {
        setLowStockData(response.data);
      });

      axios.get('http://localhost:3000/api/dash/orders/pending', {
        headers: { Authorization: `Bearer ${user.token}` },
      }).then(response => {
        setPendingOrdersData(response.data);
      });
    }
  }, [user]);

  // Low Stock Products Chart Configuration
  const lowStockChartOptions = {
    chart: {
      type: 'bar',
      height: 380,
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
        distributed: true,
      }
    },
    colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26A69A', '#D10CE8'],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px',
        colors: ['#fff']
      }
    },
    xaxis: {
      categories: lowStockData.map(product => product.name), // Using real product names
    },
    legend: {
      show: false
    },
    tooltip: {
      enabled: false
    },
    grid: {
      show: false
    }
  };

  const lowStockChartData = [{
    name: "In Stock",
    data: lowStockData.map(product => product.inStock)
  }];

  // Pending Orders Chart Configuration
  const pendingOrdersChartOptions = {
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
        distributed: true,
      }
    },
    colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e'],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px',
        colors: ['#fff']
      }
    },
    xaxis: {
      categories: pendingOrdersData.map(order => order.product_name), // Using real product names
    },
    legend: {
      show: false
    },
    tooltip: {
      enabled: false
    },
    grid: {
      show: false
    }
  };

  const pendingOrdersChartData = [{
    name: "Quantity",
    data: pendingOrdersData.map(order => order.quantity)
  }];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Stock Manager Dashboard</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.2)', borderRadius: '8px' }}>
            <CardContent>
              <Typography variant="h6">Low Stock Products</Typography>
              <ReactApexChart options={lowStockChartOptions} series={lowStockChartData} type="bar" height={380} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.2)', borderRadius: '8px' }}>
            <CardContent>
              <Typography variant="h6">Pending Orders</Typography>
              <ReactApexChart options={pendingOrdersChartOptions} series={pendingOrdersChartData} type="bar" height={350} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StockManagerDashboard;
