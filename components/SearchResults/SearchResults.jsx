import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

const SearchResults = ({ movies }) => {
    const [filteredMovies, setFilteredMovies] = useState([]);
    const location = useLocation();
    const searchTerm = location.state?.searchTerm || '';

    useEffect(() => {
        if (searchTerm) {
            const filtered = movies.filter((movie) =>
                (movie.title || movie.name).toLowerCase().includes(searchTerm) ||
                (movie.overview || '').toLowerCase().includes(searchTerm)
            );
            setFilteredMovies(filtered);
        }
    }, [searchTerm, movies]);

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Search Results for "{searchTerm}"</h1>
            <Row>
                {filteredMovies.length > 0 ? (
                    filteredMovies.map((movie) => (
                        <Col key={movie.id} sm={12} md={6} lg={4} className="mb-4">
                            <Card className="h-100">
                                <Card.Img
                                    variant="top"
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title || movie.name}
                                />
                                <Card.Body>
                                    <Card.Title>{movie.title || movie.name}</Card.Title>
                                    <Card.Text>{movie.overview}</Card.Text>
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
        </Container>
    );
};

export default SearchResults;
