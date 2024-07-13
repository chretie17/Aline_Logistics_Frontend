import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { getAllStocks, createStock, updateStock, deleteStock } from '../../services/StockServices';
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  InputLabel,
  FormControl,
  MenuItem,
  Select
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const ManageStock = () => {
  const { user } = useContext(AuthContext);
  const [stocks, setStocks] = useState([]);
  const [summaryData, setSummaryData] = useState({ sales: 0, remaining: 0, lowStock: 0 });
  const [formData, setFormData] = useState({ name: '', category: '', upc: '', price: '', inStock: '', totalValue: '', status: '', description: '', images: [] });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, [user]);

  const fetchAllData = async () => {
    const token = user.token;
    const stocksData = await getAllStocks(token);
    setStocks(stocksData.data);
    // Fetch summary data from your API endpoint
    // const summaryData = await getSummaryData(token);
    // setSummaryData(summaryData.data);
  };

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleCreateStock = async (e) => {
    e.preventDefault();
    const token = user.token;
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('upc', formData.upc);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('inStock', formData.inStock);
    formDataToSend.append('totalValue', formData.totalValue);
    formDataToSend.append('status', formData.status);
    formDataToSend.append('description', formData.description);
    for (const file of selectedFiles) {
      formDataToSend.append('image', file);
    }
    await createStock(token, formDataToSend);
    fetchAllData();
    setFormData({ name: '', category: '', upc: '', price: '', inStock: '', totalValue: '', status: '', description: '', images: [] });
    setSelectedFiles([]);
    setOpenCreate(false);
  };

  const handleUpdateStock = async (e) => {
    e.preventDefault();
    const token = user.token;
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('upc', formData.upc);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('inStock', formData.inStock);
    formDataToSend.append('totalValue', formData.totalValue);
    formDataToSend.append('status', formData.status);
    formDataToSend.append('description', formData.description);
    if (selectedFiles.length) {
      for (const file of selectedFiles) {
        formDataToSend.append('image', file);
      }
    }
    await updateStock(token, selectedStock.id, formDataToSend);
    fetchAllData();
    setOpenUpdate(false);
  };

  const handleDeleteStock = async () => {
    const token = user.token;
    await deleteStock(token, selectedStock.id);
    fetchAllData();
    setOpenDelete(false);
  };

  const openUpdateDialog = (stock) => {
    setSelectedStock(stock);
    setFormData({
      name: stock.name,
      category: stock.category,
      upc: stock.upc,
      price: stock.price,
      inStock: stock.inStock,
      totalValue: stock.totalValue,
      status: stock.status,
      description: stock.description,
      images: stock.image ? [stock.image] : []
    });
    setOpenUpdate(true);
  };

  const openDeleteDialog = (stock) => {
    setSelectedStock(stock);
    setOpenDelete(true);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>Inventory Summary</Typography>
      <Grid container spacing={2} style={{ marginBottom: '20px' }}>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">Sales</Typography>
              <Typography variant="body2" color="text.secondary">Total ({summaryData.sales} items)</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">Remaining Product</Typography>
              <Typography variant="body2" color="text.secondary">Total {summaryData.remaining} Today</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">Low Stock</Typography>
              <Typography variant="body2" color="text.secondary">Total ({summaryData.lowStock} items) Today</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => setOpenCreate(true)} style={{ marginBottom: '20px' }}>
        Add New Stock
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>UPC</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>In-Stock</TableCell>
              <TableCell>Total Value</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stocks.map((stock, index) => (
              <TableRow key={stock.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{stock.name}</TableCell>
                <TableCell>{stock.category}</TableCell>
                <TableCell>{stock.upc}</TableCell>
                <TableCell>{`$${stock.price}`}</TableCell>
                <TableCell>{stock.inStock}</TableCell>
                <TableCell>{`$${stock.totalValue}`}</TableCell>
                <TableCell>
                  <Typography color={stock.status === 'Out of stock' ? 'error' : 'text.primary'}>
                    {stock.status}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => openUpdateDialog(stock)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => openDeleteDialog(stock)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openCreate} onClose={() => setOpenCreate(false)}>
        <DialogTitle>Add New Stock</DialogTitle>
        <form onSubmit={handleCreateStock}>
          <DialogContent>
            <TextField
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="UPC"
              value={formData.upc}
              onChange={(e) => setFormData({ ...formData, upc: e.target.value })}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Unit Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="In Stock"
              value={formData.inStock}
              onChange={(e) => setFormData({ ...formData, inStock: e.target.value })}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Total Value"
              value={formData.totalValue}
              onChange={(e) => setFormData({ ...formData, totalValue: e.target.value })}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <MenuItem value="In-Stock">In-Stock</MenuItem>
                <MenuItem value="Out of stock">Out of stock</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <InputLabel>Images</InputLabel>
            <input type="file" onChange={handleFileChange} multiple />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCreate(false)} color="secondary">Cancel</Button>
            <Button type="submit" variant="contained" color="primary">Create Stock</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={openUpdate} onClose={() => setOpenUpdate(false)}>
        <DialogTitle>Update Stock</DialogTitle>
        <form onSubmit={handleUpdateStock}>
          <DialogContent>
            <TextField
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="UPC"
              value={formData.upc}
              onChange={(e) => setFormData({ ...formData, upc: e.target.value })}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Unit Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="In Stock"
              value={formData.inStock}
              onChange={(e) => setFormData({ ...formData, inStock: e.target.value })}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Total Value"
              value={formData.totalValue}
              onChange={(e) => setFormData({ ...formData, totalValue: e.target.value })}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <MenuItem value="In-Stock">In-Stock</MenuItem>
                <MenuItem value="Out of stock">Out of stock</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <InputLabel>Images</InputLabel>
            <input type="file" onChange={handleFileChange} multiple />
            {selectedStock?.image && (
              <img
                src={`data:image/jpeg;base64,${selectedStock.image}`}
                alt="current"
                style={{ width: '100px', height: 'auto', marginTop: '10px' }}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenUpdate(false)} color="secondary">Cancel</Button>
            <Button type="submit" variant="contained" color="primary">Update Stock</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
      >
        <DialogTitle>Delete Stock</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete stock {selectedStock?.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)} color="secondary">Cancel</Button>
          <Button onClick={handleDeleteStock} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageStock;
