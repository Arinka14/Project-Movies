"use client"

import { useState } from "react"
import MovieCard from "./components/MoviesCard"
import MovieModal from "./components/MoviesModal"

export default function Home() {
  const [movies, setMovies] = useState([])
  const [query, setQuery] = useState("")
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)

  const searchMovies = async () => {
    if (!query) return

    const res = await fetch(`https://www.omdbapi.com/?apikey=fb7a98f8&s=${query}`)
    const data = await res.json()

    setHasSearched(true)

    if (data.Response === "True") {
      setMovies(data.Search)
    } else {
      setMovies([])
    }

    setQuery("")
  }

  const getMovieDetail = async (imdbID) => {
    const res = await fetch(`https://www.omdbapi.com/?apikey=fb7a98f8&i=${imdbID}`)
    const data = await res.json()
    setSelectedMovie(data)
  }

  return (
      <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">Wpu movie</a>

          <span className="navbar-text text-light ms-3">
            Search movie
              </span>
                 </div>
                   </nav> 

      <div className="container mt-5">
        <h1 className="text-center mb-5">Search Movie</h1>
    <div className="row justify-content-center">
          <div className="col-md-7">
            <div className="input-group mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Movie title..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && searchMovies()}
              />
              <button className="btn btn-dark" onClick={searchMovies}>Search</button>
            </div>
          </div>
        </div>

        <hr className="w-75 mx-auto" />
        <div className="row">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} onSelect={getMovieDetail} />
          ))}
        </div>

        {hasSearched && movies.length === 0 && (
          <div className="text-center text-dark fw-bold fs-2 mt-4">
            Movies Not Found
          </div>
        )}
      </div>
      <MovieModal selectedMovie={selectedMovie} />
    </div>
  )
}
