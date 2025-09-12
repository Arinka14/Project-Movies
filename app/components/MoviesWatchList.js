/* eslint-disable @next/next/no-img-element */
"use client"

export default function MovieWatchList({
  watchLater,
  removeFromWatchLater,
  clearWatchLater,
}) {
  if (!watchLater || watchLater.length === 0) {
    return (
      <div className="text-center mt-5">
        <h2 className="fw-bold">Your Watchlist is empty</h2>
        <p className="text-muted">Add some movies to get started 🍿</p>
      </div>
    )
  } 

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">🎬 Your Watchlist</h2>
        <button className="btn btn-danger btn-sm" onClick={clearWatchLater}>
          Clear All
        </button>
      </div>

      <div className="list-group">
        {watchLater.map((movie, index) => (
          <div
            key={movie.imdbID}
            className="list-group-item list-group-item-action d-flex align-items-start mb-3 shadow-sm"
            style={{ borderRadius: "10px" }}
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
              <h5 className="mb-1 fw-bold">
                {index + 1}. {movie.Title}
              </h5>
              <p style={{ fontSize: "0.85rem" }}>{movie.Plot}</p>
              <div style={{ fontSize: "0.8rem" }}>
                <strong>Director:</strong> {movie.Director}
              </div>
              <div style={{ fontSize: "0.8rem" }}>
                <strong>Stars:</strong> {movie.Actors}
              </div>
            </div>
            <button
              className="btn btn-outline-danger btn-sm ms-3"
              onClick={() => removeFromWatchLater(movie.imdbID)}
            >
              ❌ Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
