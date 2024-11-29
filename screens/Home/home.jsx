import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import Navbar from "../../components/Navbar/navbar";
import MovieSlider from "../../components/MovieSlider/movieslider"
const Home = () => {
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [isVideoVisible, setIsVideoVisible] = useState(true);

  // TMDB API key and base URL
  const API_KEY = "dbf2cf0c8edc41062078403b180dfd52";
  const BASE_URL = "https://api.themoviedb.org/3";

  // Fetch trending movies
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
        );
        console.log(response)
        const randomMovie =
          response.data.results[
            Math.floor(Math.random() * response.data.results.length)
          ];
        setMovie(randomMovie);

        // Fetch trailer
        const trailerResponse = await axios.get(
          `${BASE_URL}/movie/${randomMovie.id}/videos?api_key=${API_KEY}`
        );
        const trailer = trailerResponse.data.results.find(
          (vid) => vid.type === "Trailer"
        );
        setTrailerUrl(`https://www.youtube.com/watch?v=${trailer?.key}`);
      } catch (error) {
        console.error("Failed to fetch movie data", error);
      }
    };
    fetchMovie();
  }, []);

  // Handle scrolling to stop video playback
  useEffect(() => {
    const handleScroll = () => {
      setIsVideoVisible(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
    <Navbar/>
    <div className="home-page" style={{ position: "relative", height: "100vh" }}>
      {/* Background Video */}
      {trailerUrl && isVideoVisible && (
        <ReactPlayer
          url={trailerUrl}
          playing
          loop
          muted
          width="100%"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
        />
      )}

      {/* Overlay Content */}
      <div
        className="content-overlay"
        style={{
          position: "absolute",
          top: "40%",
          left: "5%",
          color: "white",
          zIndex: 1,
          maxWidth: "600px",
        }}
      >
        <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
          {movie?.title || "Loading..."}
        </h1>
        <p style={{ fontSize: "1.2rem", margin: "20px 0" }}>
          {movie?.overview || "Description not available."}
        </p>
        <div>
          <button
            style={{
              padding: "10px 20px",
              fontSize: "1rem",
              marginRight: "10px",
              backgroundColor: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Play
          </button>
          <button
            style={{
              padding: "10px 20px",
              fontSize: "1rem",
              backgroundColor: "rgba(109, 109, 110, 0.7)",
              border: "none",
              color: "white",
              cursor: "pointer",
            }}
          >
            More Info
          </button>
        </div>
      </div>

      {/* Background Fallback */}
      <div
        className="background-fallback"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -2,
          filter: isVideoVisible ? "brightness(0.5)" : "none",
        }}
      ></div>
    </div>

    <div style={{ backgroundColor: "#141414", minHeight: "100vh", padding: "20px" }}>
      <MovieSlider
        title="Trending Now"
        fetchUrl={`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`}
      />
      <MovieSlider
        title="Top Rated"
        fetchUrl={`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`}
      />
      <MovieSlider
        title="Action Movies"
        fetchUrl={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28`}
      />
      {/* <MovieSlider
        title="Comedy Movies"
        fetchUrl={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`}
      /> */}
    </div>
    </>
  );
};

export default Home;
