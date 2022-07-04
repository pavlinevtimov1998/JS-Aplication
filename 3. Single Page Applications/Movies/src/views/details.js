import {
  getById,
  getLikes,
  onLike,
  getUserLike,
  deleteLike,
} from "../api/data.js";
import { isUser } from "../util.js";
import { deleteMovie } from "./deleteMovie.js";
import { showEdit } from "./updateMovie.js";

// Nex step: Implement functionality for details and likes

const detailsPage = document.querySelector("#movie-example");
const detailsContainer = detailsPage.querySelector(".container");

let ctx;

export const showDetails = (id, ownerId, ctxTarget) => {
  ctx = ctxTarget;
  ctx.hideAll();
  detailsPage.style.display = "block";
  details(id, ownerId);
};

async function details(id, ownerid) {
  detailsContainer.replaceChildren(ctx.spinner());

  const [movie, likes, ownLike] = await Promise.all([
    getById(id),
    getLikes(id),
    getUserLike(id, ctx.isUser().id),
  ]);

  detailsContainer.replaceChildren(
    createDetails(movie, id, ownerid, likes, ownLike)
  );
}

function createDetails(data, id, ownerId, likes, ownLike) {
  const container = ctx.createElements("div", undefined, {
    class: "row bg-light text-dark",
  });
  const h1 = ctx.createElements("h1", `Movie title: ${data.title}`);
  const divImg = ctx.createElements("div", undefined, { class: "col-md-8" });
  const img = ctx.createElements("img", undefined, {
    class: "img-thumbnail",
    src: data.img,
    alt: "Movie",
  });
  divImg.append(img);
  const div = ctx.createElements("div", undefined, {
    class: "col-md-4 text-center",
  });
  const h3 = ctx.createElements("h3", "Movie Description", { class: "my-3" });
  const p = ctx.createElements("p", data.description);

  div.append(h3, p);
  if (ctx.isUser() !== null && ctx.isUser().id == ownerId) {
    const aDelete = ctx.createElements("a", "Delete", {
      class: "btn btn-danger",
    });
    aDelete.addEventListener("click", (e) => deleteMovie(id, ctx));

    const aEdit = ctx.createElements("a", "Edit", { class: "btn btn-warning" });
    aEdit.addEventListener("click", (e) =>
      showEdit(id, ownerId, ctx, showDetails)
    );

    div.append(aDelete, aEdit);
  } else {
    const aLike = ctx.createElements("a", "Like", { class: "btn btn-primary" });
    const span = ctx.createElements("span", `Liked ${likes}`, {
      class: "enrolled-span",
    });
    if (ownLike.length == 0) {
      div.append(aLike);
      console.log(ownLike);
      aLike.addEventListener("click", async (e) => {
        let [_, like] = await Promise.all([
          onLike({ movieId: id }),
          getLikes(id),
        ]);

        span.textContent = `Liked ${like}`;
        div.replaceChildren(h3, p, span);
      });
    } else {
      div.append(span);
    }
  }

  container.append(h1, divImg, div);

  return container;
}
