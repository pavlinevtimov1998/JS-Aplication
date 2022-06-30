import { updateRecipe } from "./api-calls.js";
import { showCatalogue } from "./catalog.js";
import { creatingOrEditingRecipe } from "./util.js";

const editPage = document.querySelector("#edit");

export const showEdit = (id) => {
  editPage.style.display = "block";
  if (id) {
    editPage.setAttribute("data-id", id);
  }
};


const form = editPage.querySelector("form");

console.log(form);

form.addEventListener("submit", (e) =>
  creatingOrEditingRecipe(e, updateRecipe, showCatalogue, form.parentNode.parentNode.dataset.id)
);
