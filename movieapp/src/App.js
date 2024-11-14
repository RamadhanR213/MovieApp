// src/App.js
import React, { useState, useEffect } from 'react';
import Movie from './components/Movie';
import Search from './components/Search';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovies("Batman"); 
  }, []);

  const fetchMovies = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=2f54162e&s=${query}`);
      if (response.data.Search) {
        setMovies(response.data.Search);
      } else {
        setError("No movies found");
      }
    } catch (err) {
      setError("Failed to fetch movies");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <Search onSearch={fetchMovies} />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="row">
          {movies.map((movie) => (
            <div className="col-md-4 mb-4" key={movie.imdbID}>
              <Movie movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
