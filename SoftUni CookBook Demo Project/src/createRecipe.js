import { createRecipe } from "./api/data.js";

const createSection = document.querySelector("#create");

let ctx;

export const showCreate = (ctxTarget) => {
  ctx = ctxTarget;
  ctx.hideAll();
  createSection.style.display = "block";
};

const form = document.querySelector(".create-recipe");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  const name = data.get("name").trim();
  const img = data.get("img").trim();
  const ingredients = data.get("ingredients").split("\n");
  const steps = data.get("steps").split("\n");

  if (name == "" || img == "" || ingredients == "" || steps == "") {
    return alert("Empty inputs!");
  }

  await createRecipe({
    name,
    img,
    ingredients,
    steps,
  });

  ctx.goTo("catalog", ctx);
});
