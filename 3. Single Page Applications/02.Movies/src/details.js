import { detailsRequest } from "./api-calls.js";
import { createElements, hideAll, isUser } from "./util.js";

const detailsPage = document.querySelector("#movie-example");
const detailsContainer = detailsPage.querySelector(".container");

export const showDetails = (e) => {
  hideAll();
  detailsPage.style.display = "block";
  details(e.target.dataset.id, e.target.dataset.ownerId);
};

async function details(id, ownerId) {
  const data = await detailsRequest(undefined, undefined, id);

  detailsContainer.replaceChildren(createDetails(data, id, ownerId));
}

function createDetails(data, id, ownerId) {
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

  if (isUser()._id == ownerId) {
    const aDelete = createElements("a", "Delete", { class: "btn btn-danger" });
    const aEdit = createElements("a", "Edit", { class: "btn btn-warning" });

    div.append(h3, p, aDelete, aEdit);
  }

  const aLike = createElements("a", "Like", { class: "btn btn-primary" });
  const span = createElements("span", `Liked 0`, { class: "enrolled-span" });

  div.append(h3, p, aLike, span);
  container.append(h1, divImg, div);

  return container;
}
