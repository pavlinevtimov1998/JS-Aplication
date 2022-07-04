import { getAllMovies } from "../api/data.js";
import { showDetails } from "./details.js";

const homePage = document.querySelector("#home-page");
const moviesList = document.querySelector(".card-deck");

let ctx;

export const showHome = (ctxTarget) => {
  ctx = ctxTarget;
  ctx.hideAll();
  homePage.style.display = "block";
  moviesList.replaceChildren(ctx.spinner());
  allMovies();
};

const allMovies = async () => {
  const data = await getAllMovies();

  const fragment = document.createDocumentFragment();
  data.forEach((d) => loadingMovies(d, fragment));
  moviesList.replaceChildren(fragment);
};

function loadingMovies(data, fragment) {
  const div = ctx.createElements("div", undefined, { class: "card mb-4" });
  const img = ctx.createElements("img", undefined, {
    class: "card-img-top",
    src: data.img,
    alt: "Card image cap",
    width: "400",
  });
  const divTitle = ctx.createElements("div", undefined, { class: "card-body" });
  const title = ctx.createElements("h4", data.title, { class: "card-title" });
  divTitle.append(title);

  div.append(img, divTitle);

  if (ctx.isUser()) {
    const divFooter = ctx.createElements("div", undefined, {
      class: "card-footer",
    });
    const a = ctx.createElements("a");
    const btnDetails = ctx.createElements("button", "Details", {
      type: "button",
      class: "btn btn-info",
      "data-id": data._id,
      "data-ownerid": data._ownerId,
    });
    btnDetails.addEventListener("click", (e) =>
      showDetails(data._id, data._ownerId, ctx)
    );
    a.append(btnDetails);
    divFooter.append(a);
    div.append(divFooter);
  }

  fragment.append(div);
}
