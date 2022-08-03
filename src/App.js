import React from "react";
import { useState, useEffect } from "react"; 
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./movieCard";

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("spider");

  useEffect(()=>{
    searchMovies(searchTerm);
  }, [searchTerm]);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data     = await response.json();
    setMovies(data.Search);
  }

  return (
    <div className="app">
      <h1>API Fetch</h1>

      <div className="search">
        <input 
        onChange={ (e)=> setSearchTerm(e.target.value)} 
        type="text" value ={searchTerm} 
        placeholder="Search Movies"
        />
    
        <img 
        src={SearchIcon}
        onClick={()=> searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;