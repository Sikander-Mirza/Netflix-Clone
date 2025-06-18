import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addMovie } from "../../config/watchlistslice.jsx";

const MovieModal = ({ show, handleClose, movie }) => {
  const dispatch = useDispatch();
  const watchList = useSelector((state) => state.watchList.movies);
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  const handleAddToWatchList = () => {
    if (movie) {
      const isAlreadyAdded = watchList.some((item) => item.id === movie.id);

      if (isAlreadyAdded) {
        alert(`${movie.title || movie.name} is already in your Watch List!`);
      } else {
        dispatch(
          addMovie({
            id: movie.id,
            title: movie.title || movie.name,
            poster_path: movie.poster_path,
            overview: movie.overview,
          })
        );
        alert(`${movie.title || movie.name} added to Watch List!`);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" dialogClassName="custom-modal">
      {movie && (
        <>
          <Modal.Header closeButton className="bg-dark text-white border-0">
            <Modal.Title className="fs-4 fw-semibold">
              {movie.title || movie.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark text-light">
            <div className="d-flex flex-column flex-md-row gap-4">
              <img
                src={`${imageBaseUrl}${movie.poster_path}`}
                alt={movie.title || movie.name}
                className="rounded shadow"
                style={{
                  width: "100%",
                  maxWidth: "280px",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
              <div className="movie-details">
                <p className="mb-3"><strong>Overview:</strong><br /> {movie.overview}</p>
                <p><strong>Release Date:</strong> {movie.release_date || "N/A"}</p>
                <p><strong>Rating:</strong> ⭐ {movie.vote_average || "N/A"}</p>
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
  );
};

export default MovieModal;
