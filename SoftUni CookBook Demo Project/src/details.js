import { getDetails, deleteRecipe } from "./api-calls.js";
import { showCatalogue } from "./catalog.js";
import { createElements } from "./dom-el.js";
import { showEdit } from "./edit.js";
import { hideAll, userStorige } from "./util.js";

const details = document.querySelector("#details");

export const showDetails = () => {
  details.innerHTML = "";
  details.style.display = "block";
};

export const loadingDetails = async (e, id) => {
  const data = await getDetails(id);

  const element = recipesDetails(data, id);
  showDetails();
  details.append(element);
};

function recipesDetails(data, id) {
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

  let user = userStorige(undefined, undefined, "user");

  if (user && user._id == data._ownerId) {
    const div = createElements("div", undefined, "controls");
    const btnEdit = createElements("button", "\u270E Edit");
    btnEdit.setAttribute("data-ownerId", data._ownerId);
    const btnDelete = createElements("button", "\u2716 Delete");
    btnDelete.setAttribute("data-ownerId", data._ownerId);
    btnEdit.addEventListener("click", (e) => {
      hideAll();
      showEdit(id);
    });
    btnDelete.addEventListener("click", async (e) => {
      let accessToken = userStorige();
      const confirmed = confirm(
        `Are you sure you want to delete ${data.name}?`
      );
      if (confirmed) {
        await deleteRecipe(id, accessToken);
        showCatalogue();
      }
    });
    div.append(btnEdit, btnDelete);
    article.append(div);
  }

  return article;
}
