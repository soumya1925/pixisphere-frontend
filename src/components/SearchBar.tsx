import React from 'react';
import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../features/photographers/photographerSlice';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <TextField
      label="Search photographers"
      variant="outlined"
      fullWidth
      margin="normal"
      onChange={(e) => dispatch(setSearchQuery(e.target.value))}
    />
  );
};

export default SearchBar;
