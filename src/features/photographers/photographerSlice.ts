import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Photographer } from '../../types/photographer';
import type { RootState } from '../../app/store';

export const fetchPhotographers = createAsyncThunk(
  'photographers/fetchPhotographers',
  async () => {
    const res = await axios.get<Photographer[]>('https://my-json-server.typicode.com/soumya1925/backendgb/photographers');
    return res.data;
  }
);

interface Filters {
  price: number | null;
  rating: number | null;
  styles: string[];
  location: string;
}

interface State {
  data: Photographer[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  filters: Filters;
  sortOrder: string;
  visibleCount: number; //  pagination
}

const initialState: State = {
  data: [],
  loading: false,
  error: null,
  searchQuery: '',
  filters: {
    price: null,
    rating: null,
    styles: [],
    location: '',
  },
  sortOrder: '',
  visibleCount: 3, // Initial load count
};

const photographerSlice = createSlice({
  name: 'photographers',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<{ key: keyof Filters; value: number | string }>
    ) => {
      const { key, value } = action.payload;
    
      if (key === 'styles') {
        // toggle style filter
        const index = state.filters.styles.indexOf(value as string);
        if (index >= 0) {
          state.filters.styles.splice(index, 1);
        } else {
          state.filters.styles.push(value as string);
        }
      } else {
        (state.filters[key] as any) = value;
      }
    },
    setSortOrder: (state, action: PayloadAction<string>) => {
      state.sortOrder = action.payload;
    },
    
    loadMore: (state) => {
      state.visibleCount += 3;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.searchQuery = '';
      state.sortOrder = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotographers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPhotographers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPhotographers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

// Selectors
export const selectPhotographers = (state: RootState) => state.photographers.data;
export const selectSearch = (state: RootState) => state.photographers.searchQuery;
export const selectFilters = (state: RootState) => state.photographers.filters;
export const selectSortOrder = (state: RootState) => state.photographers.sortOrder;
export const selectVisibleCount = (state: RootState) => state.photographers.visibleCount;

export const selectFilteredPhotographers = createSelector(
  [selectPhotographers, selectSearch, selectFilters, selectSortOrder],
  (photographers, search, filters, sortOrder) => {
    let result = photographers.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));

      const matchesPrice = !filters.price || p.price <= filters.price;
      const matchesRating = !filters.rating || p.rating >= filters.rating;
      const matchesLocation = !filters.location || p.location === filters.location;
      const matchesStyles =
        !filters.styles.length || filters.styles.every((s) => p.styles.includes(s));

      return matchesSearch && matchesPrice && matchesRating && matchesLocation && matchesStyles;
    });

    if (sortOrder === 'priceLowHigh') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'ratingHighLow') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortOrder === 'recent') {
      result.sort((a, b) => b.id - a.id); 
    }

    return result;
  }
);

export const selectVisiblePhotographers = createSelector(
  [selectFilteredPhotographers, selectVisibleCount],
  (filtered, count) => filtered.slice(0, count)
);

// Actions
export const {
  setSearchQuery,
  setFilters,
  setSortOrder,
  loadMore,
  clearFilters,
} = photographerSlice.actions;

export default photographerSlice.reducer;
