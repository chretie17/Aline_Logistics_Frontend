import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { getAllUsers, createUser, updateUser, deleteUser } from '../../services/AdminServices';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  Typography,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const ManageUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'client' });
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = user.token;
      const usersData = await getAllUsers(token);
      setUsers(usersData.data);
    };

    fetchData();
  }, [user]);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const token = user.token;
    const newUser = await createUser(token, formData);
    setUsers([...users, newUser.data]);
    setFormData({ name: '', email: '', password: '', role: 'client' });
    setOpenCreate(false);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const token = user.token;
    const updatedUser = await updateUser(token, selectedUser.id, formData);
    setUsers(users.map(user => user.id === selectedUser.id ? updatedUser.data : user));
    setOpenUpdate(false);
  };

  const handleDeleteUser = async () => {
    const token = user.token;
    await deleteUser(token, selectedUser.id);
    setUsers(users.filter(user => user.id !== selectedUser.id));
    setOpenDelete(false);
  };

  const openUpdateDialog = (user) => {
    setSelectedUser(user);
    setFormData({ name: user.name, email: user.email, password: '', role: user.role });
    setOpenUpdate(true);
  };

  const openDeleteDialog = (user) => {
    setSelectedUser(user);
    setOpenDelete(true);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: '#f7f7f7', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h4" align="center" gutterBottom>Manage Users</Typography>
      <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => setOpenCreate(true)} style={{ marginBottom: '20px' }}>
        Add New User
      </Button>
      <Grid container spacing={2}>
        {users.map(user => (
          <Grid item xs={12} key={user.id}>
            <Card>
              <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>{user.name} ({user.role})</Typography>
                <div>
                  <IconButton color="primary" onClick={() => openUpdateDialog(user)} style={{ marginRight: '10px' }}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => openDeleteDialog(user)}>
                    <Delete />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openCreate} onClose={() => setOpenCreate(false)}>
        <DialogTitle>Add New User</DialogTitle>
        <form onSubmit={handleCreateUser}>
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
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                label="Role"
              >
                <MenuItem value="client">Client</MenuItem>
                <MenuItem value="driver">Driver</MenuItem>
                <MenuItem value="stockManager">Stock Manager</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCreate(false)} color="secondary">Cancel</Button>
            <Button type="submit" variant="contained" color="primary">Create User</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={openUpdate} onClose={() => setOpenUpdate(false)}>
        <DialogTitle>Update User</DialogTitle>
        <form onSubmit={handleUpdateUser}>
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
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                label="Role"
              >
                <MenuItem value="client">Client</MenuItem>
                <MenuItem value="driver">Driver</MenuItem>
                <MenuItem value="stockManager">Stock Manager</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenUpdate(false)} color="secondary">Cancel</Button>
            <Button type="submit" variant="contained" color="primary">Update User</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
      >
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete user {selectedUser?.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)} color="secondary">Cancel</Button>
          <Button onClick={handleDeleteUser} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageUsers;
