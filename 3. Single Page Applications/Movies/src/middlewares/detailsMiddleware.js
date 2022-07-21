import { render } from "../../node_modules/lit-html/lit-html.js";
import { getById } from "../api/data.js";
import { navAction, userData } from "../util.js";
import { getLikes, getSpecificUserLike } from "../api/likesApi.js";

const root = document.querySelector("main");

export async function decorateContext(ctx, next) {
  ctx.render = (template) => render(template, root);
  ctx.navAction = navAction;
  ctx.userData = userData;
  next();
}

export async function detailsContext(ctx, next) {
  const userId = userData() ? userData().id : false;

  const [movie, numbOfLikes, specificLike] = await Promise.all([
    getById(ctx.params.id),
    getLikes(ctx.params.id),
    getSpecificUserLike(ctx.params.id, userId),
  ]);

  ctx.movie = movie;
  ctx.movie.likes = numbOfLikes.length;
  ctx.movie.userLike = specificLike.length;
  ctx.movie.removeLikeId =
    specificLike.length > 0
      ? numbOfLikes.find((l) => l._ownerId == userId)._id
      : null;

  next();
}

export async function editContext(ctx, next) {
  const movie = await getById(ctx.params.id);

  ctx.movie = movie;

  next();
}
