import { getOne } from "../api/data.js";
import { html, until } from "../lib.js";

const detailsTemplate = (template) => html`
  <section id="details-page" class="details">
    ${until(template, html`<p>Loading &hellip;</p>`)}
  </section>
`;

const bookTemplate = (book) => html`
  <div class="book-information">
    <h3>${book.title}</h3>
    <p class="type">Type: ${book.type}</p>
    <p class="img"><img src=${book.imageUrl} /></p>
    <div class="actions">
      <!-- Edit/Delete buttons ( Only for creator of this book )  -->
      <a class="button" href="#">Edit</a>
      <a class="button" href="#">Delete</a>

      <!-- Bonus -->
      <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
      <a class="button" href="#">Like</a>

      <!-- ( for Guests and Users )  -->
      <div class="likes">
        <img class="hearts" src="/images/heart.png" />
        <span id="total-likes">Likes: 0</span>
      </div>
      <!-- Bonus -->
    </div>
  </div>
  <div class="book-description">
    <h3>Description:</h3>
    <p>${book.description}</p>
  </div>
`;

export const detailsPage = (ctx) => {
  ctx.render(detailsTemplate(getBook()));

  async function getBook() {
    const bookId = ctx.params.id;

    const book = await getOne(bookId);

    return bookTemplate(book);
  }
};
