"use client"

import { useState, useEffect } from "react"
import MovieCard from "./components/MoviesCard"
import MovieModal from "./components/MoviesModal"
import MovieKeranjang from "./components/MoviesKeranjang"

export default function Home() {
  const [movies, setMovies] = useState([])
  const [query, setQuery] = useState("")
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [watchLater, setWatchLater] = useState([])
  const [showWatchList, setShowWatchList] = useState(false)
  const clearSelectedMovie = () => setSelectedMovie(null)

  const removeFromWatchLater = (imdbID) => {
    setWatchLater((prev) => prev.filter((m) => m.imdbID !== imdbID))
  }

  const clearWatchLater = () => {
    setWatchLater([]) 
    localStorage.removeItem("watchLater")
  }

  useEffect(() => {
    const saved = localStorage.getItem("watchLater")
    if (saved) {
      setWatchLater(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("watchLater", JSON.stringify(watchLater))
  }, [watchLater])

  async function searchMovies() {
    if (!query) return
    const res = await fetch(`https://www.omdbapi.com/?apikey=fb7a98f8&s=${query}`) // code omdb
    const data = await res.json()

    setHasSearched(true)

    if (data.Response === "True") {
      const uniqueMovies = data.Search.filter(
        (movie, index, self) =>
          index === self.findIndex((m) => m.imdbID === movie.imdbID)
      )
      setMovies(uniqueMovies)
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

  const addToWatchLater = async (movie) => {
    const res = await fetch(`https://www.omdbapi.com/?apikey=fb7a98f8&i=${movie.imdbID}`)
    const fullData = await res.json()

    setWatchLater((prev) => {
      if (prev.find((m) => m.imdbID === fullData.imdbID)) return prev
      return [...prev, fullData]
    })
  }

  return (
    <div className="bg-black min-vh-100 text-white">
      <nav className="navbar navbar-expand-lg bg-secondary navbar-l">
        <div className="container">
          <div className="flex items-center space-x-3">
            <div
              className="bg-black text-white px-2 py-2 d-inline-block"
              style={{ borderRadius: "8px" }}
            >
              <h4 className="m-0 fw-semibold tracking-wide">Wpu Movie</h4>
            </div>
          </div>

          <button
            className="btn btn-dark rounded-pill px-4 fw-semibold text-white"
            onClick={() => setShowWatchList(!showWatchList)}
          >
            {showWatchList ? "⬅️ Back" : `🛒 Watchlist (${watchLater.length})`}
          </button>
        </div>
      </nav>

      <div className="container mt-5">
        {showWatchList ? (
          <MovieKeranjang
            watchLater={watchLater}
            removeFromWatchLater={removeFromWatchLater}
            clearWatchLater={clearWatchLater}
          />
        ) : (
          <>
            <h2 className="text-center mb-3">Search Movie</h2>
            <div className="row justify-content-center">
              <div className="col-md-7">
                <div className="d-flex justify-content-center mb-4">
                  <div
                    className="input-group w-100 shadow-sm"
                    style={{ maxWidth: "800px" }}
                  >
                    <input
                      type="text"
                      className="form-control rounded-start-pill px-3 py-2 bg-white text-dark border-0"
                      placeholder=" Search Your Movies..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && searchMovies()} 
                    />
                    <button
                      className="btn btn-secondary px-3 py-2 fw-semibold rounded-end-pill text-black"
                      onClick={searchMovies}
                    >
                      🚀 Search
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <hr className="hr-custom w-75 mx-auto border-white" />

            <div className="row">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  onSelect={getMovieDetail}
                />
              ))}
            </div>

            {hasSearched && movies.length === 0 && (
              <div className="text-center text-light fw-bold fs-2 mt-4">
                Movies Not Found
              </div>
            )}

            {selectedMovie && (
              <MovieModal
                selectedMovie={selectedMovie}
                onAddWatchLater={addToWatchLater}
                onClose={clearSelectedMovie}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}
