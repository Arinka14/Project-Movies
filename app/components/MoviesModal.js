/* eslint-disable @next/next/no-img-element */
"use client"

export default function MovieModal({ selectedMovie }) {
  return (
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
  )
}
