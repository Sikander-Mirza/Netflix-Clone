// store.js
import { configureStore } from '@reduxjs/toolkit';
import watchListReducer from './watchListSlice';

const store = configureStore({
  reducer: {
    watchList: watchListReducer,
  },
});

export default store;
