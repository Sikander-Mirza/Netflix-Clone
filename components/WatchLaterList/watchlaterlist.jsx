import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { removeMovie } from "../../config/watchlistslice.jsx";
import { Modal, Button } from "react-bootstrap";

const WatchListPage = () => {
  const movies = useSelector((state) => state.watchList.movies);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [isTrailerMode, setIsTrailerMode] = useState(false);

  // TMDB API key and base URL
  const API_KEY = "dbf2cf0c8edc41062078403b180dfd52";
  const BASE_URL = "https://api.themoviedb.org/3";

  // Handle modal opening
  const handleShow = (movie) => {
    setSelectedMovie(movie);
    setTrailerUrl(""); // Reset trailer URL when opening modal
    setIsTrailerMode(false); // Reset to details mode
    setShowModal(true);
  };

  // Handle modal closing
  const handleClose = () => {
    setShowModal(false);
    setSelectedMovie(null);
    setTrailerUrl("");
    setIsTrailerMode(false);
  };

  // Fetch and play trailer when "Watch Now" is clicked
  const handleWatchNow = async () => {
    if (!selectedMovie) return;

    try {
      const response = await axios.get(
        `${BASE_URL}/movie/${selectedMovie.id}/videos?api_key=${API_KEY}`
      );
      const trailer = response.data.results.find((vid) => vid.type === "Trailer");

      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
        setIsTrailerMode(true); // Switch to trailer mode
      } else {
        alert("No trailer available for this movie.");
      }
    } catch (error) {
      console.error("Failed to fetch trailer", error);
      alert("An error occurred while fetching the trailer.");
    }
  };

  return (
    <div className="container my-5">
      <h2>Your Watch List</h2>
      {movies.length === 0 ? (
        <p>No movies in your watch list. Add some!</p>
      ) : (
        <div className="row">
          {movies.map((movie) => (
            <div key={movie.id} className="col-md-3 mb-4">
              <div className="card">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="card-img-top"
                  alt={movie.title}
                  onClick={() => handleShow(movie)}
                  style={{ cursor: "pointer" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <button
                    className="btn btn-danger"
                    onClick={() => dispatch(removeMovie(movie.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose} centered size="lg">
        {selectedMovie && (
          <>
            {isTrailerMode && trailerUrl ? (
              // Trailer Mode
              <Modal.Body>
                <iframe
                  width="100%"
                  height="400px"
                  src={trailerUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Modal.Body>
            ) : (
              // Movie Details Mode
              <>
                <Modal.Header closeButton>
                  <Modal.Title>
                    {selectedMovie.title || selectedMovie.name}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                    alt={selectedMovie.title || selectedMovie.name}
                    className="img-fluid mb-3"
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "700px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="mt-3">
                    <p>
                      <strong>Overview:</strong> {selectedMovie.overview}
                    </p>
                    <p>
                      <strong>Release Date:</strong>{" "}
                      {selectedMovie.release_date || "N/A"}
                    </p>
                    <p>
                      <strong>Rating:</strong>{" "}
                      {selectedMovie.vote_average || "N/A"}
                    </p>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleWatchNow}>
                    Watch Now
                  </Button>
                </Modal.Footer>
              </>
            )}
          </>
        )}
      </Modal>
    </div>
  );
};

export default WatchListPage;
