// store.js
import { configureStore } from '@reduxjs/toolkit';
import watchListSlice from './watchlistslice.jsx';

const store = configureStore({
  reducer: {
    watchList: watchListSlice,
  },
});

export default store;
