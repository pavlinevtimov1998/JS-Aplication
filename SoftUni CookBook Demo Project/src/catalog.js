import { getRecipes } from "./api-calls.js";
import { loadingDetails } from "./details.js";
import { createElements } from "./dom-el.js";
import { hideAll } from "./util.js";

const catalogue = document.querySelector("#catalog");

export const showCatalogue = () => {
  hideAll();
  catalogue.style.display = "block";
  showRecipes();
};

const showRecipes = async () => {
  const data = await getRecipes();

  catalogue.innerHTML = "";

  data.forEach((d) => createRecipes(d));
};

function createRecipes(data) {
  const article = createElements("article", undefined, "preview");
  article.setAttribute("data-id", data._id);
  const divTitle = createElements("div", undefined, "title");
  const h2Title = createElements("h2", data.name);
  const divSmall = createElements("div", undefined, "small");
  const img = createElements("img");
  img.setAttribute("src", data.img);

  divTitle.append(h2Title);
  divSmall.append(img);

  article.append(divTitle, divSmall);

  article.addEventListener("click", (e) => {
    hideAll();
    loadingDetails(e, article.dataset.id);
  });

  catalogue.append(article);
}
