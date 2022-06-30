import { creatingRecipe } from "./api-calls.js";
import { showCatalogue } from "./catalog.js";
import { activeNavButton, hideAll, userStorige, creatingOrEditingRecipe} from "./util.js";

const createSection = document.querySelector("#create");

export const showCreate = () => {
  hideAll();
  createSection.style.display = "block";
};

const form = document.querySelector(".create-recipe");

form.addEventListener("submit", (e) => creatingOrEditingRecipe(e, creatingRecipe, showCatalogue))


