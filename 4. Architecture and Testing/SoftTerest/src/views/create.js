import { createIdea } from "../api/data.js";

const createPage = document.querySelector("#create-page");
createPage.remove();
const form = createPage.querySelector("form");

let ctx;

export const showCreate = (ctxTarget) => {
  ctx = ctxTarget;
  ctx.showSection(createPage);
};

form.addEventListener("submit", onCreate);

async function onCreate(e) {
  e.preventDefault();

  const formData = new FormData(form);

  const [title, description, img] = [...formData.values()];

  if (title.length < 6) {
    return alert("Title should be at least 6 characters!");
  }
  if (description.length < 6) {
    return alert("Description should be at least 10 characters!");
  }
  if (title.length < 6) {
    return alert("Image should be at least 5 characters!");
  }

  await createIdea({ title, description, img });

  form.reset();

  ctx.goTo("catalog", ctx);
}
