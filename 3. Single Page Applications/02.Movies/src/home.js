import { loadMovies } from "./api-calls.js";
import { loadingMovies } from "./dom-elements.js";
import { spinner } from "./util.js";

const homePage = document.querySelector("#home-page");
const moviesList = document.querySelector(".card-deck");

export const showHome = () => {
  homePage.style.display = "block";
  moviesList.replaceChildren(spinner());
  allMovies();
};

const allMovies = async () => {
  const data = await loadMovies();

  moviesList.innerHTML = "";

  data.forEach((d) => loadingMovies(d, moviesList));
};
