import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import './SearchResults.css'; // 👈 Create this file for custom styling
import MovieModal from '../movieModel/MovieModal.jsx';
const SearchResults = () => {
  const location = useLocation();
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const searchTerm = location.state?.searchTerm?.toLowerCase() || '';

  const API_KEY = 'dbf2cf0c8edc41062078403b180dfd52';
  const BASE_URL = 'https://api.themoviedb.org/3';

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const responses = await Promise.all([
          axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`),
        ]);

        const combinedMovies = responses.flatMap((res) => res.data.results);
        const uniqueMovies = Array.from(
          new Map(combinedMovies.map((movie) => [movie.id, movie])).values()
        );

        setAllMovies(uniqueMovies);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = allMovies.filter(
        (movie) =>
          movie.title?.toLowerCase().includes(searchTerm) ||
          movie.overview?.toLowerCase().includes(searchTerm)
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(allMovies);
    }
  }, [searchTerm, allMovies]);

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4 text-white">
        {searchTerm ? `Search Results for "${searchTerm}"` : 'All Movies'}
      </h1>

      {loading ? (
        <div className="text-center text-white">
          <Spinner animation="border" variant="light" />
          <p>Loading movies...</p>
        </div>
      ) : (
        <Row className="g-4 justify-content-center">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
                <Card
  className="movie-card"
  onClick={() => {
    setSelectedMovie(movie);
    setShowModal(true);
  }}
  style={{ cursor: 'pointer' }}
>

                  <Card.Img
                    variant="top"
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : 'https://via.placeholder.com/500x750?text=No+Image'
                    }
                    alt={movie.title || movie.name}
                    className="movie-poster"
                  />
                  <Card.Body className="text-white">
                    <Card.Title className="fs-6">
                      {movie.title || movie.name}
                    </Card.Title>
                    <Card.Text className="small">
                      {movie.overview
                        ? `${movie.overview.substring(0, 90)}...`
                        : 'No overview available.'}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col className="text-center text-white">
              <p>No movies found.</p>
            </Col>
          )}
        </Row>
      )}
            <MovieModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        movie={selectedMovie}
      />
    </Container>
  );
};

export default SearchResults;
