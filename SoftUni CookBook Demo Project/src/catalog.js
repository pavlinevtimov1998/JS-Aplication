import { loadAllRecipes } from "./api/data.js";
import { loadingDetails } from "./details.js";

const catalogue = document.querySelector("#catalog");
let ctx;

export const showCatalogue = (ctxTarget) => {
  ctx = ctxTarget;
  ctx.hideAll();
  catalogue.style.display = "block";
  showRecipes();
};

const showRecipes = async () => {
  catalogue.replaceChildren(ctx.spinner());

  const data = await loadAllRecipes();

  catalogue.replaceChildren();
  data.forEach((d) => createRecipes(d));
};

function createRecipes(data) {
  const article = ctx.createElements("article", undefined, "preview");
  article.setAttribute("data-id", data._id);
  const divTitle = ctx.createElements("div", undefined, "title");
  const h2Title = ctx.createElements("h2", data.name);
  const divSmall = ctx.createElements("div", undefined, "small");
  const img = ctx.createElements("img");
  img.setAttribute("src", data.img);

  divTitle.append(h2Title);
  divSmall.append(img);

  article.append(divTitle, divSmall);

  article.addEventListener("click", (e) => {
    ctx.hideAll();
    loadingDetails(e, article.dataset.id, ctx);
  });

  catalogue.append(article);
}
