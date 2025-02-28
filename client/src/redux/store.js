import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './slices/itemSlice';
import itemTypeReducer from './slices/itemTypeSlice';

export const store = configureStore({
  reducer: {
    items: itemReducer,
    itemTypes: itemTypeReducer,
  },
});