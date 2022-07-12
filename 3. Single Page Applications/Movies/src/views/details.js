import { getById } from "../api/data.js";
import { html, until } from "../lib.js";

const detailsTemplate = (movie) => html`
  <section id="movie-example" class="section">
    <div class="container">${until(movie, html`<p>Loading &hellip;</p>`)}</div>
  </section>
`;

const movieTemplate = (movie) => html`
  <div class="row bg-light text-dark" style="flex-flow: nowrap">
    <div>
      <h1>${movie.title}</h1>

      <div id="img" class="col-md-8">
        <img class="img-thumbnail" src=${movie.img} alt="Movie" />
      </div>
    </div>
    <div class="col-md-4 text-center">
      <h3 class="my-3 ">Movie Description</h3>
      <p>${movie.description}</p>
      <a class="btn btn-danger" href="#">Delete</a>
      <a class="btn btn-warning" href="#">Edit</a>
      <a class="btn btn-primary" href="#">Like</a>
      <span class="enrolled-span">Liked 1</span>
    </div>
  </div>
`;

export function detailsPage(ctx) {
  ctx.render(detailsTemplate(getMovie(ctx)));
}

async function getMovie(ctx) {
  const movie = await getById(ctx.params.id);

  return movieTemplate(movie);
}
