

import React from 'react';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import PhotographerList from '../features/photographers/PhotographerList';

import { Box } from '@mui/material';

const CategoryPage: React.FC = () => {
  return (
    <Box display="flex">
      <Filters />
      <Box flex={1} p={2}>
        <SearchBar />
        <PhotographerList />
      </Box>
    </Box>
  );
};

export default CategoryPage;
