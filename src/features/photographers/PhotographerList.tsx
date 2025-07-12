import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../app/store';
import {
  fetchPhotographers,
  selectFilteredPhotographers,
  loadMore,
} from './photographerSlice';
import PhotographerCard from '../../components/PhotographerCard';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import { Skeleton } from '@mui/material';

const PhotographerList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, error, visibleCount } = useSelector(
    (state: RootState) => state.photographers
  );

  const filteredPhotographers = useSelector(selectFilteredPhotographers);

  useEffect(() => {
    dispatch(fetchPhotographers());
  }, [dispatch]);

  if (loading)
    return (
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={2}
        mt={2}
      >
        {[...Array(6)].map((_, index) => (
          <Box key={index} width={250}>
            <Skeleton variant="rectangular" width={250} height={180} />
            <Skeleton width="60%" sx={{ mt: 1 }} />
            <Skeleton width="80%" />
          </Box>
        ))}
      </Box>
    );

  if (error)
    return (
      <Typography color="error" textAlign="center">
        {error}
      </Typography>
    );

  const visiblePhotographers = filteredPhotographers.slice(0, visibleCount);

  return (
    <Box textAlign="center" mt={2}>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={2}
        mb={2}
      >
        {visiblePhotographers.map((photographer) => (
          <PhotographerCard key={photographer.id} photographer={photographer} />
        ))}
      </Box>

      {visiblePhotographers.length < filteredPhotographers.length && (
        <Button variant="outlined" onClick={() => dispatch(loadMore())}>
          Load More
        </Button>
      )}
    </Box>
  );
};

export default PhotographerList;