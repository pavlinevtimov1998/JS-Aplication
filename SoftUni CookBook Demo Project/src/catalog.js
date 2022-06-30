import { getDetails, getRecipes } from "./api-calls.js";
import { createElements, hideAll } from "./util.js";

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

const loadingDetails = async (e, id) => {
  const curTarget = e.currentTarget;

  const data = await getDetails(id);

  const element = recipesDetails(data, curTarget);

  curTarget.replaceWith(element);
};

function createRecipes(data) {
  const article = createElements("article", undefined, "preview");
  article.setAttribute("id", data._id);
  const divTitle = createElements("div", undefined, "title");
  const h2Title = createElements("h2", data.name);
  const divSmall = createElements("div", undefined, "small");
  const img = createElements("img");
  img.setAttribute("src", data.img);

  divTitle.append(h2Title);
  divSmall.append(img);

  article.append(divTitle, divSmall);

  article.addEventListener("click", (e) => loadingDetails(e, data._id));

  catalogue.append(article);
}

function recipesDetails(data, element) {
  const article = createElements("article");
  const h2Title = createElements("h2", data.name);
  const divBand = createElements("div", undefined, "band");
  const divThumb = createElements("div", undefined, "thumb");
  const img = createElements("img");
  img.setAttribute("src", data.img);
  const divIngredients = createElements("div", undefined, "ingredients");
  const h3Ingredients = createElements("h3", "Ingredients:");
  const ul = createElements("ul");
  data.ingredients.forEach((i) => {
    let liElement = createElements("li", i);
    ul.append(liElement);
  });
  divIngredients.append(h3Ingredients, ul);
  const divDescription = createElements("div", undefined, "description");
  const h3Desc = createElements("h3", "Preparation:");
  divDescription.append(h3Desc);
  data.steps.forEach((s) => {
    let p = createElements("p", s);
    divDescription.append(p);
  });
  divThumb.append(img);
  divBand.append(divThumb, divIngredients);
  article.append(h2Title, divBand, divDescription);

  article.addEventListener("click", (e) => {
    let curTarget = e.currentTarget;
    curTarget.replaceWith(element);
  });

  return article;
}
