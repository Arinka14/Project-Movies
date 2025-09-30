/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from "react"

export default function MovieKeranjang({
  watchLater,
  removeFromWatchLater,
  clearWatchLater,
 }) {

const [clickedId, setClickedId] = useState(null)

if (!watchLater || watchLater.length === 0) {
    return (
      <div className="text-center mt-5">
         <h2 className="fw-bold">Your Watchlist is empty</h2>
      </div>
    )
  }

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">🎬 Your Watchlist</h2>
  <button
    onClick={clearWatchLater}
    className="btn btn-secondary btn-sm ms-auto"
  >
    🗑️ Clear All
  </button>
      </div>

      <div className="list-group">
        {watchLater.map((movie, index) => (
     <div
        key={movie.imdbID}
            className="list-group-item list-group-item-action d-flex align-items-start mb-3 shadow-sm"
            style={{
              borderRadius: "12px",
              background: "linear-gradient(135deg, #383735ff, #3d588bff)", 
              color: "white",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.jpg"}
              alt={movie.Title}
              style={{
                width: "90px",
                height: "130px",
                objectFit: "cover",
                borderRadius: "8px",
                marginRight: "15px",
              }}
            />

            <div className="flex-grow-1">
              <h5
                className="mb-1 fw-bold"
                style={{
                  color: clickedId === movie.imdbID ? "black" : "white",
                }}
                onClick={() => setClickedId
                  (movie.imdbID)}
              >
                {index + 1}. {movie.Title}
              </h5>

              <p style={{ fontSize: "0.85rem" }}>{movie.Plot}</p>
              <div style={{ fontSize: "0.8rem" }}>
                <strong>Released:</strong> {movie.Released}
                <div style={{ fontSize: "0.8rem" }}>
                  <strong>Director:</strong> {movie.Director}
                  <div style={{ fontSize: "0.8rem" }}>
                    <strong>Actors:</strong> {movie.Actors}
                  </div>
                </div>
              </div>
            </div>
             
            <button
              onClick={() => removeFromWatchLater(movie.imdbID)}
              style={{
                background: "white",
                border: "1px solid black",
                color: "black",
                fontSize: "0.85rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                alignSelf: "flex-end",
              }}
            >
              ✖️ <span>Hapus</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
