import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Navbar = () => {
    const [showSearch, setShowSearch] = useState(false);

    const toggleSearch = () => {
        setShowSearch(!showSearch);
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
                    <li className="nav-item">
                        <a className="nav-link" href="/new-popular">
                            New & Popular
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/my-list">
                            My List
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/languages">
                            Browse by Languages
                        </a>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto">
                    
                    {showSearch && (
                        <li className="nav-item">
                            <input
                                type="text"
                                className="form-control me-2"
                                placeholder="Search..."
                                aria-label="Search"
                            />
                        </li>
                    )}
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            href="#"
                            onClick={toggleSearch}
                        >
                            <i className={`bi ${showSearch ? 'bi-x' : 'bi-search'}`}></i>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/kids">
                            Kids
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/notifications">
                            <i className="bi bi-bell"></i>
                        </a>
                    </li>
                    <li className="nav-item dropdown">
                        <a
                            className="nav-link dropdown-toggle"
                            href="/profile"
                            id="profileDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <img
                                src="https://via.placeholder.com/30"
                                alt="Profile"
                                className="rounded-circle"
                            />
                        </a>
                        <ul
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="profileDropdown"
                        >
                            <li>
                                <a className="dropdown-item" href="/profile-settings">
                                    Account
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="/logout">
                                    Log Out
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
