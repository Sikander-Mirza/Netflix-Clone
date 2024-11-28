import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MovieSlider.css";

const MovieSlider = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);

  // TMDB image base URL
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  // Fetch movies from the API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(fetchUrl);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, [fetchUrl]);

  return (
    <div className="movie-slider my-4">
      <h3 className="text-white mb-3">{title}</h3>

      {/* Slider Container */}
      <div className="movie-slider-row">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img
              src={`${imageBaseUrl}${movie.poster_path}`}
              alt={movie.title || movie.name}
              className="movie-image"
            />
            <div className="movie-title">{movie.title || movie.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSlider;
