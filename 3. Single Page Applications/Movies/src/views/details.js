import { deleteById, getById } from "../api/data.js";
import { html, until } from "../lib.js";
import { userData } from "../util.js";

const detailsTemplate = (movie) => html`
  <section id="movie-example" class="section">
    <div class="container">${until(movie, html`<p>Loading &hellip;</p>`)}</div>
  </section>
`;

const movieTemplate = (movie, onDelete) => html`
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
      ${userData().id == movie._ownerId
        ? html`<a
              class="btn btn-danger"
              href="javascript:void(0)"
              @click=${() => onDelete(movie._id)}
              >Delete</a
            >
            <a class="btn btn-warning" href="/edit/${movie._id}">Edit</a>`
        : html`<a class="btn btn-primary" href="#">Like</a>`}

      <span class="enrolled-span">Liked 1</span>
    </div>
  </div>
`;

export function detailsPage(ctx) {
  ctx.render(
    detailsTemplate(movieTemplate(ctx.movie, onDelete.bind(null, ctx)))
  );
}

async function onDelete(ctx, id) {
  await deleteById(id);

  ctx.page.redirect("/home");
}
