import { deleteRecipe, getDetails } from "./api/data.js";
import { showEdit } from "./edit.js";

const details = document.querySelector("#details");

const showDetails = () => {
  details.style.display = "block";
};

let ctx;

export const loadingDetails = async (e, id, ctxTarget) => {
  ctx = ctxTarget;
  details.replaceChildren(ctx.spinner());

  const data = await getDetails(id);

  showDetails();
  details.replaceChildren();
  details.append(recipesDetails(data, id));
};

function recipesDetails(data, id) {
  const article = ctx.createElements("article");
  const h2Title = ctx.createElements("h2", data.name);
  const divBand = ctx.createElements("div", undefined, "band");
  const divThumb = ctx.createElements("div", undefined, "thumb");
  const img = ctx.createElements("img");
  img.setAttribute("src", data.img);
  const divIngredients = ctx.createElements("div", undefined, "ingredients");
  const h3Ingredients = ctx.createElements("h3", "Ingredients:");
  const ul = ctx.createElements("ul");
  data.ingredients.forEach((i) => {
    let liElement = ctx.createElements("li", i);
    ul.append(liElement);
  });
  divIngredients.append(h3Ingredients, ul);
  const divDescription = ctx.createElements("div", undefined, "description");
  const h3Desc = ctx.createElements("h3", "Preparation:");
  divDescription.append(h3Desc);
  data.steps.forEach((s) => {
    let p = ctx.createElements("p", s);
    divDescription.append(p);
  });
  divThumb.append(img);
  divBand.append(divThumb, divIngredients);
  article.append(h2Title, divBand, divDescription);

  const userData = JSON.parse(sessionStorage.getItem("userData"));

  if (userData && userData.id == data._ownerId) {
    const div = ctx.createElements("div", undefined, "controls");
    const btnEdit = ctx.createElements("button", "\u270E Edit");
    btnEdit.setAttribute("data-ownerId", data._ownerId);
    const btnDelete = ctx.createElements("button", "\u2716 Delete");
    btnDelete.setAttribute("data-ownerId", data._ownerId);
    btnEdit.addEventListener("click", (e) => {
      ctx.hideAll();
      showEdit(id, ctx);
    });
    btnDelete.addEventListener("click", async (e) => {
      const confirmed = confirm(
        `Are you sure you want to delete ${data.name}?`
      );
      if (confirmed) {
        await deleteRecipe(id);
        ctx.goTo("catalog", ctx);
      }
    });
    div.append(btnEdit, btnDelete);
    article.append(div);
  }

  return article;
}
