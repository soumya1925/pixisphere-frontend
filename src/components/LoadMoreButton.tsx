import React from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { loadMore } from '../features/photographers/photographerSlice';

const LoadMoreButton: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <Button variant="outlined" onClick={() => dispatch(loadMore())}>
      Load More
    </Button>
  );
};

export default LoadMoreButton;
