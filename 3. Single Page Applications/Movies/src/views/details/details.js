import { html } from "../../lib.js";
import { delMovie } from "./deleteMovie.js";
import { onLike, revokeLike } from "./likes.js";

const movieTemplate = (ctx, delMovie, onLike, revokeLike) => html`
  <section id="movie-example" class="section">
    <div class="container">
      <div class="row bg-light text-dark" style="flex-flow: nowrap">
        <div>
          <h1>${ctx.movie.title}</h1>

          <div id="img" class="col-md-8">
            <img class="img-thumbnail" src=${ctx.movie.img} alt="Movie" />
          </div>
        </div>
        <div class="col-md-4 text-center">
          <h3 class="my-3 ">Movie Description</h3>
          <p>${ctx.movie.description}</p>
          <div class="btns-container">
            ${ctx.userData().id == ctx.movie._ownerId
              ? html`<a
                    class="btn btn-danger"
                    href="javascript:void(0)"
                    @click=${delMovie}
                    >Delete</a
                  >
                  <a class="btn btn-warning" href="/edit/${ctx.params.id}"
                    >Edit</a
                  >`
              : html`
                  ${ctx.movie.userLike == 0
                    ? html`<a
                        class="btn btn-primary"
                        href="javascript:void(0)"
                        @click=${(e) => onLike(e)}
                        >Like</a
                      >`
                    : html`<a
                        class="btn btn-primary"
                        href="javascript:void(0)"
                        @click=${(e) => revokeLike(e)}
                        >Liked</a
                      >`}
                `}
            <span class="enrolled-span">Likes ${ctx.movie.likes}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

export function detailsPage(ctx) {
  ctx.render(
    movieTemplate(
      ctx,
      delMovie.bind(null, ctx),
      onLike.bind(null, ctx),
      revokeLike.bind(null, ctx)
    )
  );
}
