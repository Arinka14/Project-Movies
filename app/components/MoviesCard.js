/* eslint-disable @next/next/no-img-element */
"use client"

export default function MovieCard({ movie, onSelect }) {
  return (
    <div className="col-md-3 my-3">
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
            className="btn btn-warning"
            data-bs-toggle="modal"
            data-bs-target="#movieModal"
            onClick={() => onSelect(movie.imdbID)}
          >
            See Detail
          </button>
        </div>
      </div>
    </div>
  )
}
