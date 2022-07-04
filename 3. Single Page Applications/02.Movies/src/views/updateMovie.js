import { updateById } from "../api/data.js";

const editPage = document.querySelector("#edit-movie");
const form = editPage.querySelector("form");

export const showEdit = (id, ownerId, ctx, showDetails) => {
  ctx.hideAll();
  editPage.style.display = "block";

  console.log('im here');

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const [title, description, img] = [...formData.values()];

    if (title == "" || description == "" || img == "") {
      return;
    }

    await updateById(id, { title, description, img });

    ctx.hideAll();
    showDetails(id, ownerId, ctx);
  });
};
