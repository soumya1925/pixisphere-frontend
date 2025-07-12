import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import '../styles/PortfolioGallery.scss';

interface Props {
  images: string[];
}

const PortfolioGallery: React.FC<Props> = ({ images }) => {
  const [index, setIndex] = useState<number>(-1);

  return (
    <Box className="portfolio-gallery-wrapper">
      <Box className="portfolio-flex-container">
        {images.map((img, i) => (
          <Box key={i} className="portfolio-item">
            <Card
              className="portfolio-card"
              elevation={3}
              onClick={() => setIndex(i)}
            >
              <Box className="image-wrapper">
                <CardMedia
                  component="img"
                  image={img}
                  alt={`portfolio-${i}`}
                  className="portfolio-img"
                />
              </Box>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Shot #{i + 1}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Lightbox Popup */}
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={images.map((src) => ({ src }))}
      />
    </Box>
  );
};

export default PortfolioGallery;

