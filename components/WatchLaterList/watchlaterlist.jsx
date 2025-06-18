import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { removeMovie } from "../../config/watchlistslice.jsx";
import { Modal, Button } from "react-bootstrap";
import "./WatchListPage.css"; // ⬅️ optional CSS enhancements

const WatchListPage = () => {
  const movies = useSelector((state) => state.watchList.movies);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [isTrailerMode, setIsTrailerMode] = useState(false);

  const API_KEY = "dbf2cf0c8edc41062078403b180dfd52";
  const BASE_URL = "https://api.themoviedb.org/3";

  const handleShow = (movie) => {
    setSelectedMovie(movie);
    setTrailerUrl("");
    setIsTrailerMode(false);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedMovie(null);
    setTrailerUrl("");
    setIsTrailerMode(false);
  };

  const handleWatchNow = async () => {
    if (!selectedMovie) return;

    try {
      const response = await axios.get(
        `${BASE_URL}/movie/${selectedMovie.id}/videos?api_key=${API_KEY}`
      );
      const trailer = response.data.results.find((vid) => vid.type === "Trailer");

      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
        setIsTrailerMode(true);
      } else {
        alert("No trailer available.");
      }
    } catch (error) {
      console.error("Failed to fetch trailer", error);
      alert("Error fetching trailer.");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center text-white mb-4">🎬 Your Watch List</h2>
      {movies.length === 0 ? (
        <p className="text-center text-muted">No movies in your watch list. Add some!</p>
      ) : (
        <div className="row">
          {movies.map((movie) => (
            <div key={movie.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
              <div
                className="card h-100 shadow-sm movie-card"
                style={{
                  backgroundColor: "#1e1e1e",
                  border: "1px solid #333",
                  color: "#fff",
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="card-img-top"
                  alt={movie.title}
                  onClick={() => handleShow(movie)}
                  style={{
                    height: "360px",
                    objectFit: "cover",
                    borderTopLeftRadius: "0.5rem",
                    borderTopRightRadius: "0.5rem",
                    cursor: "pointer",
                  }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title text-center mb-3">{movie.title}</h5>
                  <button
                    className="btn btn-outline-danger btn-sm w-100 mt-auto"
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
     <Modal
  show={showModal}
  onHide={handleClose}
  centered
  size="xl"
  dialogClassName="custom-modal-style"
>
  {selectedMovie && (
    <>
      {isTrailerMode && trailerUrl ? (
        <Modal.Body className="bg-black p-0">
          <div style={{ position: "relative", paddingTop: "56.25%" }}>
            <iframe
              src={trailerUrl}
              title="YouTube Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "0.5rem",
              }}
            ></iframe>
          </div>
        </Modal.Body>
      ) : (
        <>
          <Modal.Header closeButton className="bg-dark text-white border-0">
            <Modal.Title style={{ fontWeight: "600" }}>
              {selectedMovie.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark text-white d-flex flex-column flex-lg-row gap-4">
            <img
              src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
              className="img-fluid rounded shadow"
              style={{
                width: "100%",
                maxWidth: "300px",
                height: "auto",
                objectFit: "cover",
              }}
            />
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              <p><strong>Overview:</strong><br /> {selectedMovie.overview}</p>
              <p><strong>Release Date:</strong> {selectedMovie.release_date || "N/A"}</p>
              <p><strong>Rating:</strong> ⭐ {selectedMovie.vote_average || "N/A"}</p>
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-dark border-0">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="warning"
              className="text-dark fw-semibold"
              onClick={handleWatchNow}
            >
              ▶ Watch Trailer
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
