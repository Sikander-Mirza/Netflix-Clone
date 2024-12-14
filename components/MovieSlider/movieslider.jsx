import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addMovie } from "../../config/watchlistslice.jsx"; // Adjust path as needed
import "./MovieSlider.css";

const MovieSlider = ({ title, fetchUrl }) => {
  const dispatch = useDispatch();
  const watchList = useSelector((state) => state.watchList.movies); // Retrieve movies from Redux store

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch movies from the API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(fetchUrl);
        setMovies(response.data.results || []); // Ensure it defaults to an empty array
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, [fetchUrl]);

  // Open modal with movie details
  const handleShow = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  // Close modal
  const handleClose = () => {
    setSelectedMovie(null);
    setShowModal(false);
  };

  // Add movie to the watch list
  const handleAddToWatchList = () => {
    if (selectedMovie) {
      const isAlreadyAdded = watchList.some((movie) => movie.id === selectedMovie.id);

      if (isAlreadyAdded) {
        alert(`${selectedMovie.title || selectedMovie.name} is already in your Watch List!`);
      } else {
        dispatch(
          addMovie({
            id: selectedMovie.id,
            title: selectedMovie.title || selectedMovie.name,
            poster_path: selectedMovie.poster_path,
            overview: selectedMovie.overview,
          })
        );
        alert(`${selectedMovie.title || selectedMovie.name} added to Watch List!`);
      }
    }
  };

  // TMDB image base URL
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="movie-slider my-4">
      <h3 className="text-white mb-3">{title}</h3>

      {/* Movie Slider Row */}
      <div className="movie-slider-row">
        {movies.map((movie) => (
          <div
            className="movie-card"
            key={movie.id}
            onClick={() => handleShow(movie)}
          >
            <img
              src={`${imageBaseUrl}${movie.poster_path}`}
              alt={movie.title || movie.name}
              className="movie-image"
            />
            <div className="movie-title">{movie.title || movie.name}</div>
          </div>
        ))}
      </div>

      {/* Modal for Movie Details */}
      <Modal show={showModal} onHide={handleClose} centered>
        {selectedMovie && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedMovie.title || selectedMovie.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                src={`${imageBaseUrl}${selectedMovie.poster_path}`}
                alt={selectedMovie.title || selectedMovie.name}
                className="img-fluid"
                style={{ width: "100%", height: "auto", maxHeight: "700px", objectFit: "cover" }}
              />
              <div className="mt-3">
                <p><strong>Overview:</strong> {selectedMovie.overview}</p>
                <p><strong>Release Date:</strong> {selectedMovie.release_date || "N/A"}</p>
                <p><strong>Rating:</strong> {selectedMovie.vote_average || "N/A"}</p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleAddToWatchList}>
                Add to Watch List
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default MovieSlider;
