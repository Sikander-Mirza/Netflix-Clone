import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';

const SearchResults = () => {
    const location = useLocation(); 
    const [allMovies, setAllMovies] = useState([]); // All movies
    const [filteredMovies, setFilteredMovies] = useState([]); // Filtered movies
    const [loading, setLoading] = useState(true); // Loading indicator

    // Extract search term from state (default to empty string)
    const searchTerm = location.state?.searchTerm?.toLowerCase() || '';

    // TMDB API Key and Base URL
    const API_KEY = "dbf2cf0c8edc41062078403b180dfd52"; // Replace with your Vite environment variable
    const BASE_URL = 'https://api.themoviedb.org/3';

    // Fetch all movies when the component is loaded
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const responses = await Promise.all([
                    axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`),
                    axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`),
                    axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`),
                ]);

                // Combine and remove duplicates
                const combinedMovies = responses.flatMap(res => res.data.results);
                const uniqueMovies = Array.from(
                    new Map(combinedMovies.map(movie => [movie.id, movie])).values()
                );

                setAllMovies(uniqueMovies); // Store all movies
                setLoading(false); // Stop loading
            } catch (error) {
                console.error('Error fetching movies:', error);
                setLoading(false);
            }
        };

        fetchMovies();
    }, []); // Runs only once when the component is loaded

    // Filter movies whenever the search term or movie list changes
    useEffect(() => {
        if (searchTerm) {
            const filtered = allMovies.filter(
                (movie) =>
                    (movie.title?.toLowerCase().includes(searchTerm) || '') ||
                    (movie.overview?.toLowerCase().includes(searchTerm) || '')
            );
            setFilteredMovies(filtered); // Update filtered movies
        } else {
            setFilteredMovies(allMovies); // Show all movies if no search term
        }
    }, [searchTerm, allMovies]); // Re-run when searchTerm or movies change

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">
                {searchTerm ? `Search Results for "${searchTerm}"` : 'All Movies'}
            </h1>

            {/* Show loading spinner */}
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                    <p>Loading movies...</p>
                </div>
            ) : (
                <Row>
                    {filteredMovies.length > 0 ? (
                        filteredMovies.map((movie) => (
                            <Col key={movie.id} sm={12} md={6} lg={4} className="mb-4">
                                <Card className="h-100">
                                    <Card.Img
                                        variant="top"
                                        src={
                                            movie.poster_path
                                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                                : 'https://via.placeholder.com/500x750?text=No+Image'
                                        }
                                        alt={movie.title || movie.name}
                                    />
                                    <Card.Body>
                                        <Card.Title>{movie.title || movie.name}</Card.Title>
                                        <Card.Text>
                                            {movie.overview
                                                ? `${movie.overview.substring(0, 100)}...`
                                                : 'No overview available.'}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col className="text-center">
                            <p>No movies found.</p>
                        </Col>
                    )}
                </Row>
            )}
        </Container>
    );
};

export default SearchResults;
