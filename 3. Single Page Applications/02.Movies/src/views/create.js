import { postMovie } from "../api/data.js";

const createPage = document.querySelector("#add-movie");
const form = createPage.querySelector("form");
let ctx;

export const showCreate = (ctxTarget) => {
  ctx = ctxTarget;
  ctx.hideAll();
  createPage.style.display = "block";
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let formData = new FormData(e.currentTarget);

  let [title, description, img] = [...formData.values()];

  if (title == "" || description == "" || img == "") {
    return alert("Empty inputs");
  }

  await postMovie({ title, description, img });

  // [...form.querySelectorAll("input")].forEach((i) => (i.value = ""));

  form.reset();

  ctx.goTo("home", ctx);
});
