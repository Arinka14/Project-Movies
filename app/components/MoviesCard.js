/* eslint-disable @next/next/no-img-element */
"use client"

export default function MovieCard({ movie, onSelect }) {
  return (
    <div className="col-md-2 my-3">
      <div
        className="card shadow-sm"
        style={{
          backgroundColor: "#383735ff",
          color: "white",
          borderRadius: "12px",
        }}
      >
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          className="card-img-top"
          alt={movie.Title}
          style={{
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          }}
        />
        
    <div className="card-body text-center p-2">
      <button
        className="btn btn-light w-100 btn-sm"
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
