import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Visibility, VisibilityOff, Facebook, Twitter, Google, GitHub } from '@mui/icons-material';
import { registerUser } from '../services/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('client');

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password, role });
      alert('User registered successfully');
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: '2rem', textAlign: 'center' }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
          borderRadius: 1,
          boxShadow: 3,
          backgroundColor: 'white',
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Register
        </Typography>
        <Box mb={2}>
          <Typography variant="body2" gutterBottom>
            Sign up with:
          </Typography>
          <Grid container spacing={1} justifyContent="center">
            <Grid item>
              <IconButton aria-label="facebook">
                <Facebook style={{ color: '#1877F2' }} />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton aria-label="twitter">
                <Twitter style={{ color: '#1DA1F2' }} />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton aria-label="google">
                <Google style={{ color: '#DB4437' }} />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton aria-label="github">
                <GitHub style={{ color: '#333' }} />
              </IconButton>
            </Grid>
          </Grid>
        </Box>

        <Typography variant="body2" gutterBottom>
          or
        </Typography>

        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel id="role-select-label">Role</InputLabel>
          <Select
            labelId="role-select-label"
            id="role-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            label="Role"
          >
            <MenuItem value="client">Client</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          control={<Checkbox value="agree" color="primary" />}
          label="I have read and agree to the terms"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>

        <Grid container justifyContent="center">
          <Grid item>
            <Typography variant="body2">
              Already have an account? <a href="#!">Login</a>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Register;
