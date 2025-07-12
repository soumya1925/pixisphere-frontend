import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Chip,
  Button,
  Stack,
  Box,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';
import type { Photographer } from '../types/photographer';
import '../styles/PhotographerCard.scss';

type Props = {
  photographer: Photographer;
};

const PhotographerCard: React.FC<Props> = ({ photographer }) => {
  return (
    <Box className="photographer-card-container">
      <Card className="photographer-card">
        <Box className="profile-image-wrapper">
          <CardMedia
            component="img"
            image={photographer.profilePic}
            alt={photographer.name}
            className="photographer-image"
          />
        </Box>
        
        <CardContent className="card-details">
          <Box className="photographer-name-row">
            <Typography variant="h6" className="photographer-name">
              {photographer.name}
            </Typography>
            <CheckCircleIcon className="tick-icon" fontSize="small" />
          </Box>

          <Typography variant="body2" className="photographer-bio">
            {photographer.bio}
          </Typography>

          <Typography variant="body2" className="photographer-meta">
            📍 {photographer.location} • ₹{photographer.price} • ⭐ {photographer.rating}
          </Typography>

          <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" sx={{ mb: 2 }}>
            {photographer.tags.map((tag) => (
              <Chip key={tag} label={tag} className="custom-chip" />
            ))}
            {photographer.styles.map((style) => (
              <Chip key={style} label={style} className="custom-chip outlined" variant="outlined" />
            ))}
          </Stack>

          <Link to={`/profile/${photographer.id}`} style={{ textDecoration: 'none' }}>
            <Button variant="contained" className="View-Profile-button">
             View-Profile
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PhotographerCard;