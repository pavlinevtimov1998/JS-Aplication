import { loadMovies } from "./api-calls.js";
import { loadingMovies } from "./dom-elements.js";

const homePage = document.querySelector("#home-page");

export const showHome = () => {
  homePage.style.display = "block";
};

const moviesList = document.querySelector(".card-deck");

const allMovies = async () => {
  const data = await loadMovies();

  moviesList.innerHTML = '';

  data.forEach((d) => loadingMovies(d, moviesList));
};

allMovies();