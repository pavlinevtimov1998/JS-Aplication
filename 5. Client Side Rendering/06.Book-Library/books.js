import { html } from "./node_modules/lit-html/lit-html.js";
import { until } from "./node_modules/lit-html/directives/until.js";

import { deleteById, getById, getRequest } from "./api.js";

const bookTableTemplate = (books) => html`
  <table>
    <thead>
      <tr>
        <th>Author</th>
        <th>Title</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      ${until(
        books,
        html`<tr>
          <td colspan="3">Load&hellip;</td>
        </tr>`
      )}
    </tbody>
  </table>
`;

const booksTemplate = (book, onEdit, onDelete) => html`<tr>
  <td>${book.author}</td>
  <td>${book.title}</td>
  <td>
    <button @click=${(e) => onEdit()}>Edit</button>
    <button @click=${(e) => onDelete()}>Delete</button>
  </td>
</tr>`;

export const showBooks = (context) => {
  return bookTableTemplate(allBooks(context));
};

async function allBooks(context) {
  const data = await (await getRequest()).json();

  return Object.entries(data).map(([k, d]) =>
    booksTemplate(
      d,
      onEdit.bind(null, k, d, context),
      onDelete.bind(null, k, context)
    )
  );
}

async function onEdit(id, book, context) {
  book._id = id;
  context.book = book;

  context.render([context.showBooks(context), context.showEditForm(context)]);
}

async function onDelete(id, context) {
  await deleteById("/" + id);

  context.render([context.showBooks(context), context.showAddForm(context)]);
}
