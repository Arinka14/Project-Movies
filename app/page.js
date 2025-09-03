/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from "react"

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

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto"></ul>
          </div>
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
            <div className="col-md-4 my-3" key={movie.imdbID}>
              <div className="card">
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
                  className="card-img-top"
                  alt={movie.Title}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.Title}</h5>
                  <p className="card-text">Year: {movie.Year}</p>
                  <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#movieModal"
                    onClick={() => getMovieDetail(movie.imdbID)}
                  >
                    See Detail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {hasSearched && movies.length === 0 && (
          <div className="text-center text-dark fw-bold fs-2 mt-4">
            Movies Not Found
          </div>
        )}
      </div>

      <div className="modal fade" id="movieModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{selectedMovie?.Title}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              {selectedMovie ? (
                <>
                  <div className="row">
                    <div className="col-md-4">
                      <img
                        src={selectedMovie.Poster}
                        className="img-fluid"
                        alt={selectedMovie.Title}
                      />
                    </div>
                    <div className="col-md-8">
                      <ul className="list-group">
                        <li className="list-group-item"><h3>{selectedMovie.Title}</h3></li>
                        <li className="list-group-item"><strong>Released:</strong> {selectedMovie.Released}</li>
                        <li className="list-group-item"><strong>Genre:</strong> {selectedMovie.Genre}</li>
                        <li className="list-group-item"><strong>Director:</strong> {selectedMovie.Director}</li>
                        <li className="list-group-item"><strong>Actors:</strong> {selectedMovie.Actors}</li>
                        <li className="list-group-item"><strong>Plot:</strong> {selectedMovie.Plot}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="text-end mt-3">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
