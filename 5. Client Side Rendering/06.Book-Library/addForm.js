import { postRequest } from "./api.js";
import { html } from "./node_modules/lit-html/lit-html.js";

export const addFormTemplate = (context) =>
  html`
    <form @submit=${(e) => onSubmit(e, context)} id="add-form">
      <h3>Add book</h3>
      <label>TITLE</label>
      <input type="text" name="title" placeholder="Title..." />
      <label>AUTHOR</label>
      <input type="text" name="author" placeholder="Author..." />
      <input type="submit" value="Submit" />
    </form>
    ;
  `;

export const showAddForm = (context) => {
  return addFormTemplate(context);
};

async function onSubmit(e, context) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const [title, author] = [...formData.values()];

  await postRequest({ title, author });

  e.target.reset();

  context.render([context.showBooks(context), context.showAddForm(context)]);
}
