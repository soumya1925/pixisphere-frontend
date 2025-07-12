import React from 'react';
import {
  Box, Typography, Slider, FormGroup, FormControlLabel, Checkbox, MenuItem, Select
} from '@mui/material';
import { useDispatch } from 'react-redux';
import {
  setFilters
} from '../features/photographers/photographerSlice';

const Filters: React.FC = () => {
  const dispatch = useDispatch();

  const handleStyleChange = (style: string) => {
    dispatch(setFilters({ key: 'styles', value: style }));
  };

  return (
    
    <Box sx={{ width: 250, p: 2 }}>
    {/* Mirage Logo */}
    <Typography
      variant="h4"
      gutterBottom
      sx={{
        fontFamily: 'cursive',
        color: '#0077cc',
        fontWeight: 'bold',
        textAlign: 'center',
        mb: 3,
      }}
    >
      Studio Mirage
    </Typography>

      <Typography gutterBottom>Price Range</Typography>
      <Slider
        min={0}
        max={50000}
        step={1000}
        valueLabelDisplay="auto"
        onChangeCommitted={(_, value) =>
          dispatch(setFilters({ key: 'price', value }))
        }
      />

      <Typography>Ratings</Typography>
      <FormGroup>
        {[4, 3, 2].map((rating) => (
          <FormControlLabel
            key={rating}
            control={<Checkbox onChange={() => dispatch(setFilters({ key: 'rating', value: rating }))} />}
            label={`${rating}+ stars`}
          />
        ))}
      </FormGroup>

      <Typography>Styles</Typography>
      <FormGroup>
        {['Traditional', 'Candid', 'Studio', 'Outdoor'].map((style) => (
          <FormControlLabel
            key={style}
            control={<Checkbox onChange={() => handleStyleChange(style)} />}
            label={style}
          />
        ))}
      </FormGroup>

      <Typography>City</Typography>
      <Select
        fullWidth
        defaultValue=""
        onChange={(e) => dispatch(setFilters({ key: 'location', value: e.target.value }))}
      >
        <MenuItem value="">All Cities</MenuItem>
        <MenuItem value="Bengaluru">Bengaluru</MenuItem>
        <MenuItem value="Mumbai">Mumbai</MenuItem>
        <MenuItem value="Delhi">Delhi</MenuItem>
      </Select>
    </Box>
  );
};

export default Filters;
