"use client"

import { useState, useEffect} from "react"
import MovieCard from "./components/MoviesCard"
import MovieModal from "./components/MoviesModal"


export default function Home() {
  const [movies, setMovies] = useState([])
  const [query, setQuery] = useState("")
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [watchLater, setWatchLater] = useState([])
  const clearSelectedMovie = () => setSelectedMovie(null)

  const removeFromWatchLater = (imdbID) => {
  setWatchLater((prev) => prev.filter((m) => m.imdbID !== imdbID))
}

  const clearWatchLater = () => {
    setWatchLater([])   // hapus semua daftar
    localStorage.removeItem("watchLater") // kosongkan localStorage juga
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

    const res = await fetch(`https://www.omdbapi.com/?apikey=fb7a98f8&s=${query}`)
    const data = await res.json()

    setHasSearched(true)

    if (data.Response === "True") {
      const uniqueMovies = data.Search.filter(
        (movie, index, self) => index === self.findIndex((m) => m.imdbID === movie.imdbID)
      )
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

      const addToWatchLater = (movie) => {
      setWatchLater((prev) => {
        if (prev.find((m) => m.imdbID === movie.imdbID)) return prev
        return [...prev, movie]
      })
    }

  return (
    <><nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <div className="d-flex align-items-center">
          <a className="navbar-brand me-3" href="#">
            Wpu movie
          </a>
          <span className="navbar-text text-light">
            Search movie
          </span>
        </div>
      </div>
    
        <div className="dropdown me-5">
        <button
            className="btn dropdown-toggle"
            style={{ border: "none", background: "transparent", color: "white" }}
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            data-bs-dismiss="modal"
        >
          🛒 ({watchLater.length})
        </button>

        <ul className="dropdown-menu dropdown-menu-end">
  {watchLater.length === 0 ? (
    <li className="dropdown-item text-muted">Belum ada film</li>
  ) : (
    <>
          {watchLater.map((movie) => {
            return (
              <li
                key={movie.imdbID}
                className="dropdown-item d-flex justify-content-between align-items-center"
              >
                <span>
                  {movie.Title} ({movie.Year})
                </span>
                <button
                  className="btn btn-sm btn-danger ms-2"
                  onClick={() => removeFromWatchLater(movie.imdbID)}
                >
                  ✕
                </button>
              </li>
            )
          })}

          <li>
            <button
              className="dropdown-item text-danger text-center"
              onClick={clearWatchLater}
            >
              🗑️ Clear All
            </button>
          </li>
        </>
      )}
    </ul>

          </div>
      </nav>
      <><div className="container mt-5">
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
                  onKeyDown={(e) => e.key === "Enter" && searchMovies()} />
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

            {selectedMovie && (
              <MovieModal
                selectedMovie={selectedMovie}
                onAddWatchLater={addToWatchLater}
                onClose={clearSelectedMovie}  
              />
            )}


        </div>
        </></>
  )
}
