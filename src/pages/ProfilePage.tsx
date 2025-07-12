import React, { useEffect, useState } from 'react';
import PortfolioGallery from '../components/PortfolioGallery'; 
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Box,
  Chip,
  Button,
  Paper,
  Modal,
  TextField,
  Rating,
} from '@mui/material';
import { Skeleton } from '@mui/material';

import axios from 'axios';
import '../styles/PhotographerProfile.scss';

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface Photographer {
  id: number;
  name: string;
  bio: string;
  location: string;
  price: number;
  styles: string[];
  tags: string[];
  rating: number;
  profilePic: string;
  portfolio: string[];
  reviews: Review[];
}

const PhotographerProfile: React.FC = () => {
    const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [message, setMessage] = useState('');
  const { id } = useParams();
  const [photographer, setPhotographer] = useState<Photographer | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.get<Photographer[]>('https://my-json-server.typicode.com/soumya1925/backendgb/photographers')
      .then((res) => {
        const match = res.data.find((p) => p.id.toString() === id);
        if (match) setPhotographer(match);
      })
      .catch((err) => console.error('Error fetching photographers:', err));
  }, [id]);

  const handleSubmit = () => {
    if (!name || !email || !message) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Form',
        text: 'Please fill in all fields.',
      });
      return;
    }
  
    Swal.fire({
      icon: 'success',
      title: 'Inquiry Sent!',
      text: 'Your request has been sent. We will get back to you as soon as possible.',
    });
  
    
    setName('');
    setEmail('');
    setMessage('');
    setOpen(false);
  };

  if (!photographer)
    return (
      <Box className="profile-page">
        <Box className="profile-header">
          <Skeleton variant="rectangular" width={200} height={200} className="profile-pic" />
          <Box className="profile-info">
            <Skeleton variant="text" width="60%" height={40} />
            <Skeleton variant="text" width="90%" />
            <Skeleton variant="text" width="40%" />
            <Box mt={2} display="flex" gap={1}>
              {[...Array(3)].map((_, idx) => (
                <Skeleton key={idx} variant="rounded" width={80} height={32} />
              ))}
            </Box>
            <Box mt={2}>
              <Skeleton variant="text" width={120} />
            </Box>
            <Skeleton variant="rounded" width={160} height={40} sx={{ mt: 2 }} />
          </Box>
        </Box>
  
        <Box className="portfolio-section" mt={4}>
          <Skeleton variant="text" width="30%" height={32} />
          <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
            {[...Array(4)].map((_, idx) => (
              <Skeleton key={idx} variant="rectangular" width={250} height={180} />
            ))}
          </Box>
        </Box>
  
        <Box className="reviews-section" mt={4}>
          <Skeleton variant="text" width="30%" height={32} />
          {[...Array(2)].map((_, idx) => (
            <Box key={idx} mt={2}>
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
            </Box>
          ))}
        </Box>
      </Box>
    );

  return (
    <Box className="profile-page">
      <Box className="profile-header">
        <img src={photographer.profilePic} alt={photographer.name} className="profile-pic" />
        <Box className="profile-info">
          <Typography variant="h4">{photographer.name}</Typography>
          <Typography variant="body1" className="bio">{photographer.bio}</Typography>
          <Typography variant="subtitle1" className="price">
            Starting from ₹{photographer.price}
          </Typography>

          <Box mt={2}>
            {photographer.styles.map((style) => (
              <Chip key={style} label={style} className="chip" />
            ))}
            {photographer.tags.map((tag) => (
              <Chip key={tag} label={tag} color="secondary" className="chip" />
            ))}
          </Box>

          <Box mt={2}>
            <Rating value={photographer.rating} precision={0.1} readOnly />
          </Box>

          <Button
            variant="contained"
            color="primary"
            className="inquiry-btn"
            onClick={() => setOpen(true)}
          >
            Send Inquiry
          </Button>
        </Box>
      </Box>

      <Box className="portfolio-section">
        <Typography variant="h5" gutterBottom>
          Portfolio
        </Typography>
        <Box className="portfolio-gallery">
        
          <PortfolioGallery images={photographer.portfolio} />
        </Box>
      </Box>

      <Box className="reviews-section">
        <Typography variant="h5" gutterBottom>
          Reviews
        </Typography>
        {photographer.reviews.map((review, index) => (
          <Paper key={index} className="review-card" elevation={2}>
            <Typography variant="subtitle1">{review.name}</Typography>
            <Rating value={review.rating} readOnly />
            <Typography variant="body2" className="comment">
              {review.comment}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {review.date}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Inquiry Modal */}
      <Modal
  open={open}
  onClose={() => setOpen(false)}
  BackdropProps={{
    style: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
  }}
>
<Box className="modal-form">
  <Typography variant="h6" gutterBottom>Send Inquiry</Typography>
  
  <TextField
    label="Your Name"
    fullWidth
    margin="normal"
    required
    value={name}
    onChange={(e) => setName(e.target.value)}
  />

  <TextField
    label="Email"
    fullWidth
    margin="normal"
    required
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />

  <TextField
    label="Message"
    multiline
    rows={4}
    fullWidth
    margin="normal"
    required
    value={message}
    onChange={(e) => setMessage(e.target.value)}
  />

  <Button
    variant="contained"
    fullWidth
    sx={{ mt: 2 }}
    onClick={handleSubmit}
  >
    Submit
  </Button>
</Box>
      </Modal>
    </Box>
  );
};

export default PhotographerProfile;
