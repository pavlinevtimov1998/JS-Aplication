import { putRequest } from "./api.js";
import { html } from "./node_modules/lit-html/lit-html.js";

export const editFormTemplate = (context) =>
  html`
    <form @submit=${(e) => onUpdate(e, context)} id="edit-form">
      <input type="hidden" name="id" .value=${context.book._id} />
      <h3>Edit book</h3>
      <label>TITLE</label>
      <input type="text" name="title" .value=${context.book.title} />
      <label>AUTHOR</label>
      <input type="text" name="author" .value=${context.book.author} />
      <input type="submit" value="Save" />
    </form>
  `;

export const showEditForm = (context) => {
  return editFormTemplate(context);
};

async function onUpdate(e, context) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const [id, title, author] = [...formData.values()];

  await putRequest({ title, author }, "/" + id);

  e.target.reset();

  context.render([context.showBooks(context), context.showAddForm(context)]);
}
