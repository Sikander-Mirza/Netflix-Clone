import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar/navbar';
import SearchResults from '../components/SearchResults/SearchResults';
import Home from '../screens/Home/home';
import axios from 'axios';

const App = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(
                    'https://api.themoviedb.org/3/discover/movie',
                    {
                        params: { api_key: 'dbf2cf0c8edc41062078403b180dfd52' }, // Replace with your TMDB API Key
                    }
                );
                setMovies(response.data.results);
            } catch (error) {
                console.error('Failed to fetch movies:', error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <Router>
            <Navbar movies={movies} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/search"
                    element={<SearchResults movies={movies} />}
                />
            </Routes>
        </Router>
    );
};

export default App;
