import { render } from "./node_modules/lit-html/lit-html.js";
import { showBooks } from "./books.js";
import { showAddForm } from "./addForm.js";
import { showEditForm } from "./editForm.js";

const container = document.querySelector("body");

const context = {
  showBooks,
  showAddForm,
  showEditForm,
  render: (template) => render(template, container),
};

context.render([showBooks(context), showAddForm(context)]);
