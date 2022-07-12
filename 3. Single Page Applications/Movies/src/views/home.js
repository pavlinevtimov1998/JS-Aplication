import { html, until } from "../lib.js";
import { getAllMovies } from "../api/data.js";

const homeTemplate = (movies) => html`
  <section id="home-page" class="section">
    <div
      class="jumbotron jumbotron-fluid text-light"
      style="background-color: #343a40;"
    >
      <img
        src="https://slicksmovieblog.files.wordpress.com/2014/08/cropped-movie-banner-e1408372575210.jpg"
        class="img-fluid"
        alt="Responsive image"
        style="width: 150%; height: 200px"
      />
      <h1 class="display-4">Movies</h1>
      <p class="lead">
        Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.
      </p>
    </div>
    <div class="movies">
      <h1 class="text-center">Movies</h1>

      <section id="add-movie-button">
        <a href="/create" class="btn btn-warning ">Add Movie</a>
      </section>

      <section id="movie">
        <div class=" mt-3 ">
          <div class="row d-flex d-wrap">
            <div class="card-deck d-flex justify-content-center">
              ${until(movies, html`<p>Loading &hellip;</p>`)}
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
`;

const moviesTemplate = (movie) => html`
  <div class="card mb-4">
    <img
      class="card-img-top"
      src="${movie.img}"
      alt="Card image cap"
      width="400"
    />
    <div class="card-body">
      <h4 class="card-title">${movie.title}</h4>
    </div>
    <div class="card-footer">
      <a href="/details/${movie._id}">
        <button type="button" class="btn btn-info">Details</button>
      </a>
    </div>
  </div>
`;

export function homePage(ctx) {
  ctx.render(homeTemplate(getMovies()));
}

async function getMovies() {
  const data = await getAllMovies();

  return data.map((movie) => moviesTemplate(movie));
}
