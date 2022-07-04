import { getById } from "../api/data.js";
import { deleteMovie } from "./deleteMovie.js";
import { showEdit } from "./updateMovie.js";

// Nex step: Implement functionality for details and likes

const detailsPage = document.querySelector("#movie-example");
const detailsContainer = detailsPage.querySelector(".container");
let ctx;

export const showDetails = (id, ownerid, showHome, ctxTarget) => {
  ctx = ctxTarget;
  ctx.hideAll();
  detailsPage.style.display = "block";
  details(id, ownerid, showHome);
};

async function details(id, ownerid, showHome) {
  detailsContainer.replaceChildren(spinner());

  const [movie, likes, ownLike] = await Promise.all([
    detailsRequest(undefined, undefined, id),
    getLikes(id),
    isLiked(id, isUser()._id),
  ]);

  detailsContainer.replaceChildren(
    createDetails(movie, id, ownerid, likes, ownLike, showHome)
  );
}

function createDetails(data, id, ownerid, likes, ownLike, showHome) {
  const container = createElements("div", undefined, {
    class: "row bg-light text-dark",
  });
  const h1 = createElements("h1", `Movie title: ${data.title}`);
  const divImg = createElements("div", undefined, { class: "col-md-8" });
  const img = createElements("img", undefined, {
    class: "img-thumbnail",
    src: data.img,
    alt: "Movie",
  });
  divImg.append(img);
  const div = createElements("div", undefined, {
    class: "col-md-4 text-center",
  });
  const h3 = createElements("h3", "Movie Description", { class: "my-3" });
  const p = createElements("p", data.description);

  div.append(h3, p);
  if (isUser()._id == ownerid) {
    const aDelete = createElements("a", "Delete", { class: "btn btn-danger" });
    aDelete.addEventListener("click", (e) => deleteMovie(id, showHome));

    const aEdit = createElements("a", "Edit", { class: "btn btn-warning" });
    aEdit.addEventListener("click", (e) => showEdit(id, showDetails));

    div.append(aDelete, aEdit);
  } else {
    const aLike = createElements("a", "Like", { class: "btn btn-primary" });
    const span = createElements("span", `Liked ${likes}`, {
      class: "enrolled-span",
    });
    if (ownLike == 0) {
      aLike.addEventListener("click", async (e) => {
        await onLike({ movieId: id }, isUser().accessToken);
        span.textContent = `Liked ${likes + 1}`;
        div.replaceChildren(h3, p, span);
      });
      div.append(aLike);
    } else {
      div.append(span);
    }
  }

  container.append(h1, divImg, div);

  return container;
}

async function getLikes(movieId) {
  const url = `http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`;

  const data = await likeRequest(url);

  return data;
}

async function isLiked(movieId, userId) {
  const url = `http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`;

  const data = await likeRequest(url);

  return data.length;
}