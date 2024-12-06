import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Navbar = ({ movies }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        // Redirect to search results page with the search term
        if (value.trim() !== '') {
            navigate('/search', { state: { searchTerm: value } });
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
            <a className="navbar-brand text-danger fw-bold" href="/">
                NETFLIX
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <a className="nav-link active" href="/">
                            Home
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/tv-shows">
                            TV Shows
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/movies">
                            Movies
                        </a>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search movies..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
