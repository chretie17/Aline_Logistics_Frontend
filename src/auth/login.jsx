import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import { Visibility, VisibilityOff, Facebook, Twitter, Google, GitHub } from '@mui/icons-material';
import { AuthContext } from '../contexts/AuthContext';
import { loginUser } from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      const { token, role } = res.data;
      localStorage.setItem('token', token);
      setUser({ token, role });

      switch (role) {
        case 'client':
          navigate('/');
          break;
        case 'driver':
          navigate('/driver-dashboard');
          break;
        case 'stockManager':
          navigate('/stock-manager-dashboard');
          break;
        case 'admin':
          navigate('/admin-dashboard');
          break;
        default:
          navigate('/');
          break;
      }
    } catch (error) {
      console.error('Error logging in:', error);
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
          Login
        </Typography>
        <Box mb={2}>
          <Typography variant="body2" gutterBottom>
            Sign in with:
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
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
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

        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>

        <Grid container justifyContent="center">
          <Grid item>
            <Typography variant="body2">
              Not a member? <a href="/register">Register</a>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
