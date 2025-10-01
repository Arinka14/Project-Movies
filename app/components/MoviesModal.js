/* eslint-disable @next/next/no-img-element */
"use client"

export default function MovieModal({ selectedMovie, onAddWatchLater, onClose }) {
  const handleAdd = () => {
    onAddWatchLater(selectedMovie)

    const closeBtn = document.querySelector("#movieModal .btn-close")
    if (closeBtn) closeBtn.click()

    if (onClose) onClose()
  }

  return (
    <div className="modal fade" id="movieModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div 
          className="modal-content text-white"
          style={{
            background: "linear-gradient(135deg, #383735ff, #3d588bff)",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <div 
            className="modal-header"
            style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          >
            <h5 className="modal-title fw-bold">{selectedMovie?.Title}</h5>
            <button
              type="button"
              className="btn-close bg-light"
              data-bs-dismiss="modal"
              onClick={onClose} 
            ></button>
          </div>

          <div className="modal-body">
            {selectedMovie ? (
              <>
                <div className="row">
                  <div className="col-md-4">
                    <img
                      src={selectedMovie.Poster}
                      className="img-fluid rounded shadow"
                      alt={selectedMovie.Title}
                    />
                  </div>
                  <div className="col-md-8">
                    <ul className="list-group list-group-flush">
                      <li 
                        className="list-group-item"
                        style={{ backgroundColor: "rgba(0,0,0,0.2)", color: "white" }}
                      >
                        <h3 className="fw-bold">{selectedMovie.Title}</h3>
                      </li>
                      <li className="list-group-item bg-transparent text-white">
                        <strong>Released : </strong> {selectedMovie.Released}
                      </li>
                      <li className="list-group-item bg-transparent text-white">
                        <strong>Genre : </strong> {selectedMovie.Genre}
                      </li>
                      <li className="list-group-item bg-transparent text-white">
                        <strong>Director : </strong> {selectedMovie.Director}
                      </li>
                      <li className="list-group-item bg-transparent text-white">
                        <strong>Actors : </strong> {selectedMovie.Actors}
                      </li>
                      <li className="list-group-item bg-transparent text-white">
                        <strong>Plot : </strong> {selectedMovie.Plot}
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="text-end mt-3">
                  <button    
                    type="button"
                    className="btn btn-dark me-2"
                    data-bs-dismiss="modal"
                    onClick={onClose}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-dark fw-bold"
                    onClick={handleAdd}
                  >
                    + Tonton Nanti
                  </button>
                </div>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
