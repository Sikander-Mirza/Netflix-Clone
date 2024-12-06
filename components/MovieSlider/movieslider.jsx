import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MovieSlider.css";

const MovieSlider = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  return (
    <div className="movie-slider my-4">
      <h3 className="text-white mb-3">{title}</h3>

      {/* Slider Container */}
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

      {/* React Bootstrap Modal */}
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
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default MovieSlider;
