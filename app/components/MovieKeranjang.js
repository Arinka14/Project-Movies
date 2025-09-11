"use client"

export default function WatchLater({ watchLater, removeFromWatchLater, clearWatchLater }) {
    return (
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
                  className="btn btn-sm btn-warning ms-2"
                  onClick={() => removeFromWatchLater(movie.imdbID)}
                >
                  ✕
                </button>
              </li>
            )
          })}

          <li>
            <button
              className="dropdown-item text-dark text-center"
              onClick={clearWatchLater}
            >
              🗑️ Clear All
            </button>
          </li>
        </>
      )}
    </ul>

          </div>
    )
}