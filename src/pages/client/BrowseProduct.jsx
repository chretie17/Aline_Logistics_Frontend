import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { getAllStocks } from '../../services/StockServices';
import { createOrder } from '../../services/OrdersServices';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';

const BrowseProducts = () => {
  const { user } = useContext(AuthContext);
  const [stocks, setStocks] = useState([]);
  const [openBuy, setOpenBuy] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, [user]);

  const fetchAllData = async () => {
    const token = user.token;
    const stocksData = await getAllStocks(token);
    setStocks(stocksData.data);
  };

  const handleBuyProduct = async () => {
    const token = user.token;
    const orderData = {
      productId: selectedProduct.id,
      quantity: 1, // You can add quantity selection functionality if needed
      userId: user.id
    };
    await createOrder(token, orderData);
    setOpenBuy(false);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>Products</Typography>
      <Grid container spacing={2}>
        {stocks.map(stock => (
          <Grid item xs={12} sm={6} md={4} key={stock.id}>
            <Card>
              {stock.image && (
                <CardMedia
                  component="img"
                  height="140"
                  image={`data:image/jpeg;base64,${stock.image}`}
                  alt={stock.name}
                />
              )}
              <CardContent>
                <Typography variant="h5" component="div">{stock.name}</Typography>
                <Typography variant="body2" color="text.secondary">{stock.description}</Typography>
                <Typography variant="body2" color="text.secondary">Price: ${stock.price}</Typography>
                <Typography variant="body2" color="text.secondary">In Stock: {stock.inStock}</Typography>
                <Button variant="contained" color="primary" onClick={() => { setSelectedProduct(stock); setOpenBuy(true); }}>
                  Buy
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openBuy} onClose={() => setOpenBuy(false)}>
        <DialogTitle>Confirm Purchase</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to buy {selectedProduct?.name}?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBuy(false)} color="secondary">Cancel</Button>
          <Button onClick={handleBuyProduct} variant="contained" color="primary">Buy</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BrowseProducts;
