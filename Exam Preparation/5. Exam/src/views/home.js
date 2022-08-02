import { getAll } from "../api/data.js";
import { html, until } from "../lib.js";

const homeTemplate = (tempalte) => html`
  <section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>
    <ul class="other-books-list">
      ${until(tempalte, html`<p>Loading &hellip;</p>`)}
    </ul>
  </section>
`;

const bookTemplate = (book) => html`
  <li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src=${book.imageUrl} /></p>
    <a class="button" href="/details/${book._id}">Details</a>
  </li>
`;

const noBooksTemplate = () => html`
  <p class="no-books">No books in database!</p>
`;

export const homePage = (ctx) => {
  ctx.render(homeTemplate(getBooks()));

  async function getBooks() {
    const books = await getAll();

    return books.length > 0
      ? books.map((b) => bookTemplate(b))
      : noBooksTemplate();
  }
};
