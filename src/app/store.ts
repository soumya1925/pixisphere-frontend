import { configureStore } from '@reduxjs/toolkit';
import photographerReducer from '../features/photographers/photographerSlice';

export const store = configureStore({
  reducer: {
    photographers: photographerReducer,
  },
});

// Type definitions for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
