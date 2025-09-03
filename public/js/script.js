document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#search-input");
  const btn = document.querySelector("#search-btn");
  const movieList = document.querySelector("#movie-list");
  const modalTitle = document.querySelector("#movieModalLabel");
  const modalBody = document.querySelector("#movieModalBody");

  const API_KEY = "fb7a98f8";
  async function searchMovies() {
    const query = input.value.trim();
    if (!query) return;

    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
    const data = await res.json();

    movieList.innerHTML = "";

    if (data.Response === "True") {
      data.Search.forEach((movie) => {
        const card = document.createElement("div");
        card.className = "col-md-4 my-3";
        card.innerHTML = `
          <div class="card">
            <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}" class="card-img-top" alt="${movie.Title}" />
            <div class="card-body">
              <h5 class="card-title">${movie.Title}</h5>
              <p class="card-text">Year: ${movie.Year}</p>
              <button class="btn btn-primary btn-detail" data-id="${movie.imdbID}" data-bs-toggle="modal" data-bs-target="#movieModal">
                See Detail
              </button>
            </div>
          </div>
        `;
        movieList.appendChild(card);
      });
    } else {
      movieList.innerHTML = `<p class="text-danger">${data.Error}</p>`;
    }
  }

  btn.addEventListener("click", searchMovies);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") searchMovies();
  });

  movieList.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn-detail")) {
      const imdbID = e.target.dataset.id;
      const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`);
      const data = await res.json();

      modalTitle.textContent = data.Title;
      modalBody.innerHTML = `
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="img-fluid" alt="${movie.Title}" />
          </div>
          <div class="col-md-8">
            <ul class="list-group">
              <li class="list-group-item"><strong></strong><h3> ${movie.Released} </h3> </li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
              <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
              <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
              <li class="list-group-item"><strong>Plot:</strong> ${movie.Plot}</li>
            </ul>
          </div>
        </div>
      `;

      const searchMovies = async () => {
  if (!query) return;

  const res = await fetch(`https://www.omdbapi.com/?apikey=fb7a98f8&s=${query}`)
  const data = await res.json()

  if (data.Response === "True") {
    setMovies(data.Search)
  } else {
    setMovies([])
    alert(data.Error)
  }

  setQuery("")
}
    }
  });
});
