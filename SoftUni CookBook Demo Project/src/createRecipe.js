import { creatingRecipe } from "./api-calls.js";
import { showCatalogue } from "./catalog.js";
import { activeNavButton, hideAll, userStorige } from "./util.js";

const createSection = document.querySelector("#create");

export const showCreate = () => {
  hideAll();
  createSection.style.display = "block";
};

const form = document.querySelector(".create-recipe");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(e.currentTarget);

  const name = data.get("name");
  const img = data.get("img");
  const ingredients = data.get("ingredients").split("\n");
  const steps = data.get("steps").split("\n");

  if (name == "" || img == "" || ingredients == "" || steps == "") {
    return alert("Empty inputs!");
  }

  const body = {
    name,
    img,
    ingredients,
    steps,
  };

  const accessToken = userStorige();
  await creatingRecipe(body, undefined, accessToken);
  showCatalogue();
  activeNavButton();
});
