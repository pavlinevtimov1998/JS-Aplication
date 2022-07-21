import { html } from "../../lib.js";
import * as like from "../../api/likesApi.js";

export async function onLike(ctx, e) {
  e.target.textContent = "Loading ...";

  await like.createLike({ movieId: ctx.params.id });

  ctx.page.redirect(`/details/${ctx.params.id}`);
}

export async function revokeLike(ctx, e) {
  e.target.textContent = "Loading ...";

  await like.deleteLike(ctx.movie.removeLikeId);

  ctx.page.redirect(`/details/${ctx.params.id}`);
}
