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
      <Modal show={showModal} onHide={handleClose} centered size="lg" dialogClassName="custom-modal">
  {selectedMovie && (
    <>
      <Modal.Header closeButton className="bg-dark text-white border-0">
        <Modal.Title className="fs-4 fw-semibold">
          {selectedMovie.title || selectedMovie.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-light">
        <div className="d-flex flex-column flex-md-row gap-4">
          <img
            src={`${imageBaseUrl}${selectedMovie.poster_path}`}
            alt={selectedMovie.title || selectedMovie.name}
            className="rounded shadow"
            style={{
              width: "100%",
              maxWidth: "280px",
              height: "auto",
              objectFit: "cover",
            }}
          />
          <div className="movie-details">
            <p className="mb-3"><strong>Overview:</strong><br /> {selectedMovie.overview}</p>
            <p><strong>Release Date:</strong> {selectedMovie.release_date || "N/A"}</p>
            <p><strong>Rating:</strong> ⭐ {selectedMovie.vote_average || "N/A"}</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-dark border-0">
        <Button variant="outline-light" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="warning"
          className="text-dark fw-semibold"
          onClick={handleAddToWatchList}
        >
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
