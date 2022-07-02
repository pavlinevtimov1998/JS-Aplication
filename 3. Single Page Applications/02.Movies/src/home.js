import { loadMovies } from "./api-calls.js";
import { showDetails } from "./details.js";
import { createElements, hideAll, isUser, spinner } from "./util.js";

const homePage = document.querySelector("#home-page");
const moviesList = document.querySelector(".card-deck");

export const showHome = () => {
  hideAll();
  homePage.style.display = "block";
  moviesList.replaceChildren(spinner());
  allMovies();
};

const allMovies = async () => {
  const data = await loadMovies();

  moviesList.innerHTML = "";

  data.forEach((d) => loadingMovies(d, moviesList));
};

function loadingMovies(data, parent) {
  const div = createElements("div", undefined, { class: "card mb-4" });
  const img = createElements("img", undefined, {
    class: "card-img-top",
    src: data.img,
    alt: "Card image cap",
    width: "400",
  });
  const divTitle = createElements("div", undefined, { class: "card-body" });
  const title = createElements("h4", data.title, { class: "card-title" });
  divTitle.append(title);

  div.append(img, divTitle);

  if (isUser()) {
    const divFooter = createElements("div", undefined, {
      class: "card-footer",
    });
    const a = createElements("a");
    const btnDetails = createElements("button", "Details", {
      type: "button",
      class: "btn btn-info",
      "data-id": data._id,
      'data-ownerid': data._ownerId
    });
    btnDetails.addEventListener("click", (e) => showDetails(e));
    a.append(btnDetails);
    divFooter.append(a);
    div.append(divFooter);
  }

  parent.append(div);
}
