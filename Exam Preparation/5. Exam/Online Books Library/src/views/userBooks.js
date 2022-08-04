import { getUserBooks } from "../api/data.js";
import { html, until } from "../lib.js";

const catalogTemplate = (tempalte) => html`
  <section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    <ul class="my-books-list">
      ${until(tempalte, html`Loading &hellip;`)}
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

export const profilePage = (ctx) => {
  const userId = ctx.userData().id;

  ctx.render(catalogTemplate(getBooks()));

  async function getBooks() {
    const books = await getUserBooks(userId);

    return books.length > 0
      ? books.map((b) => bookTemplate(b))
      : noBooksTemplate();
  }
};
