import {
  deleteById,
  deleteLike,
  getLikes,
  getUserLike,
  like,
} from "../api/data.js";
import { html, until } from "../lib.js";
import { userData } from "../util.js";

const detailsTemplate = (movie) => html`
  <section id="movie-example" class="section">
    <div class="container">${until(movie, html`<p>Loading &hellip;</p>`)}</div>
  </section>
`;

const movieTemplate = async (
  movie,
  onDelete,
  onLike,
  numberOfLikes,
  specificLike,
  revokeLike
) => html`
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
        : html`
            ${(await specificLike(movie._id)) == 0
              ? html`<a
                  class="btn btn-primary"
                  href="javascript:void(0)"
                  @click=${(e) => onLike(movie._id)}
                  >Like</a
                >`
              : ""}
          `}

      <span
        class="enrolled-span"
        style="cursor: pointer"
        @click=${() => revokeLike()}
        >${await numberOfLikes(movie._id)} Likes</span
      >
    </div>
  </div>
`;

export function detailsPage(ctx) {
  ctx.render(
    detailsTemplate(
      movieTemplate(
        ctx.movie,
        onDelete.bind(null, ctx),
        onLike.bind(null, ctx),
        numberOfLikes,
        specificLike,
        revokeLike.bind(null, ctx)
      )
    )
  );
}

let likeId;

async function onDelete(ctx, id) {
  await deleteById(id);

  ctx.page.redirect("/home");
}

async function onLike(ctx, id) {
  const data = await like({ movieId: id });

  likeId = data._id;

  ctx.page.redirect(`/details/${ctx.params.id}`);
}

async function numberOfLikes(id) {
  const numb = await getLikes(id);

  return numb;
}

async function specificLike(movieId) {
  const data = await getUserLike(movieId, userData().id);

  const num = data.length;
  return num;
}

async function revokeLike(ctx) {
  await deleteLike(likeId);

  ctx.page.redirect(`/details/${ctx.params.id}`);
}
