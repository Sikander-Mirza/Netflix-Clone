// store.js
import { configureStore } from '@reduxjs/toolkit';
import watchListSlice from './watchListSlice';

const store = configureStore({
  reducer: {
    watchList: watchListSlice,
  },
});

export default store;
