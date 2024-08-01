import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
} from '@mui/material';

const ClientFeedback = () => {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleSubmitFeedback = async () => {
    if (!message.trim()) return;

    try {
      const token = user.token;
      await axios.post(
        '/api/feedbacks',
        { userId: user.id, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('');
      setFeedbackSubmitted(true);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setFeedbackSubmitted(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Submit Your Feedback
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            We value your feedback
          </Typography>
          <TextField
            label="Your Message"
            fullWidth
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            variant="outlined"
            margin="normal"
          />
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitFeedback}
              disabled={!message.trim()}
            >
              Submit Feedback
            </Button>
          </Box>
          {feedbackSubmitted && (
            <Typography color="success" variant="body2" mt={2}>
              Thank you for your feedback!
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default ClientFeedback;
