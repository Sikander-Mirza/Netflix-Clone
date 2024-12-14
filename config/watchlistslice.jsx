import { createSlice } from "@reduxjs/toolkit";

const watchListSlice = createSlice({
  name: "watchList",
  initialState: {
    movies: [],
  },
  reducers: {
    addMovie: (state, action) => {
      const movieExists = state.movies.some(
        (movie) => movie.id === action.payload.id
      );
      if (!movieExists) {
        state.movies.push(action.payload);
      }
    },
    removeMovie: (state, action) => {
      state.movies = state.movies.filter((movie) => movie.id !== action.payload);
    },
  },
});

export const { addMovie, removeMovie } = watchListSlice.actions;

export default watchListSlice.reducer;
