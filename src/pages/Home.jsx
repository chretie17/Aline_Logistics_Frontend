import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Carousel styles

// Importing images
import logistics1 from '../images/l2.jpg';
import logistics2 from '../images/The-Ultimate-Guide-to-Logistics.jpg';
import logistics3 from '../images/l3.jpg';

const SlideImage = styled('img')({
  width: '100%',
  height: 'auto',
  borderRadius: '10px',
  objectFit: 'cover',
});

const Home = () => {
  const theme = useTheme(); // Access MUI theme

  // Fallback values for theme properties
  const defaultBoxShadow = '0px 1px 3px rgba(0, 0, 0, 0.2)';
  const boxShadow = theme.shadows && theme.shadows[3] ? theme.shadows[3] : defaultBoxShadow;

  return (
    <Container maxWidth="lg" sx={{ marginTop: '2rem', textAlign: 'center' }}>
      <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
        Welcome to the Logistics Management System
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ color: '#34495e' }}>
        Efficient. Reliable. Transparent.
      </Typography>
      <Box sx={{ marginTop: '2rem', position: 'relative' }}>
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={5000}
          transitionTime={1000}
          useKeyboardArrows
          dynamicHeight
        >
          <div>
            <SlideImage src={logistics1} alt="Logistics Image 1" />
            <Typography
              variant="h6"
              sx={{
                position: 'absolute',
                bottom: 16,
                left: 16,
                color: '#fff',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '8px 16px',
                borderRadius: '4px',
              }}
            >
              Streamlined Operations
            </Typography>
          </div>
          <div>
            <SlideImage src={logistics2} alt="Logistics Image 2" />
            <Typography
              variant="h6"
              sx={{
                position: 'absolute',
                bottom: 16,
                left: 16,
                color: '#fff',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '8px 16px',
                borderRadius: '4px',
              }}
            >
              Seamless Supply Chain
            </Typography>
          </div>
          <div>
            <SlideImage src={logistics3} alt="Logistics Image 3" />
            <Typography
              variant="h6"
              sx={{
                position: 'absolute',
                bottom: 16,
                left: 16,
                color: '#fff',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '8px 16px',
                borderRadius: '4px',
              }}
            >
              Real-Time Tracking
            </Typography>
          </div>
        </Carousel>
      </Box>
      <Grid container spacing={4} sx={{ marginTop: '4rem' }}>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              padding: theme.spacing(3),
              borderRadius: theme.shape.borderRadius,
              boxShadow: boxShadow,
              backgroundColor: 'white',
              height: '100%',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
              About Us
            </Typography>
            <Typography variant="body1" sx={{ color: '#7f8c8d' }}>
              Our logistics management system is designed to streamline your operations, reduce costs, and improve
              efficiency.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              padding: theme.spacing(3),
              borderRadius: theme.shape.borderRadius,
              boxShadow: boxShadow,
              backgroundColor: 'white',
              height: '100%',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
              Our Services
            </Typography>
            <Typography variant="body1" sx={{ color: '#7f8c8d' }}>
              We offer comprehensive logistics solutions including transportation, warehousing, and supply chain
              management.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              padding: theme.spacing(3),
              borderRadius: theme.shape.borderRadius,
              boxShadow: boxShadow,
              backgroundColor: 'white',
              height: '100%',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
              Contact Us
            </Typography>
            <Typography variant="body1" sx={{ color: '#7f8c8d' }}>
              Get in touch with our team to learn more about how we can help your business thrive.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
