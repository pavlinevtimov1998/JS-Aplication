import { updateRecipe } from "./api/data.js";

const editPage = document.querySelector("#edit");

let ctx;

export const showEdit = (id, ctxTarget) => {
  ctx = ctxTarget;
  editPage.style.display = "block";
  if (id) {
    editPage.setAttribute("data-id", id);
  }
};

const form = editPage.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  editRecipe(form.parentNode.parentNode.dataset.id);
});

async function editRecipe(id) {
  const data = new FormData(form);

  const name = data.get("name").trim();
  const img = data.get("img").trim();
  const ingredients = data.get("ingredients").split("\n");
  const steps = data.get("steps").split("\n");

  if (name == "" || img == "" || ingredients == "" || steps == "") {
    return alert("Empty inputs!");
  }

  await updateRecipe(id, {
    name,
    img,
    ingredients,
    steps,
  });

  ctx.goTo("catalog", ctx);
}
