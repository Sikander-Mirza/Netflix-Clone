// WatchListPage.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeMovie } from "../../config/watchlistslice.jsx";

const WatchListPage = () => {
  const movies = useSelector((state) => state.watchList.movies);
  const dispatch = useDispatch();

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
    </div>
  );
};

export default WatchListPage;
