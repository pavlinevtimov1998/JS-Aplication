import {
  createLike,
  deleteBook,
  getLikes,
  getOne,
  getSpecifikLike,
} from "../api/data.js";
import { html, until, nothing } from "../lib.js";

const detailsTemplate = (template) => html`
  <section id="details-page" class="details">
    ${until(template, html`<p>Loading &hellip;</p>`)}
  </section>
`;

const bookTemplate = (
  book,
  userId,
  onLike,
  specificLike,
  likes,
  onDelete
) => html`
  <div class="book-information">
    <h3>${book.title}</h3>
    <p class="type">Type: ${book.type}</p>
    <p class="img"><img src=${book.imageUrl} /></p>
    <div class="actions">
      ${userId == book._ownerId
        ? html`<a class="button" href="/edit/${book._id}">Edit</a>
            <a @click=${onDelete} class="button" href="javascript:void(0)"
              >Delete</a
            >`
        : nothing}
      ${userId && userId !== book._ownerId && specificLike == 0
        ? html`
            <a @click=${onLike} class="button" href="javascript:void(0)"
              >Like</a
            >
          `
        : nothing}

      <div class="likes">
        <img class="hearts" src="/images/heart.png" />
        <span id="total-likes">Likes: ${likes}</span>
      </div>
    </div>
  </div>
  <div class="book-description">
    <h3>Description:</h3>
    <p>${book.description}</p>
  </div>
`;

export const detailsPage = (ctx) => {
  const userId = ctx.userData() ? ctx.userData().id : undefined;
  const bookId = ctx.params.id;

  ctx.render(detailsTemplate(getBook()));

  async function getBook() {
    let specificLike = null;

    const [book, likes] = await Promise.all([getOne(bookId), getLikes(bookId)]);

    if (userId && userId !== bookId) {
      specificLike = await getSpecifikLike(bookId, userId);
    }

    console.log(specificLike, likes);

    return bookTemplate(book, userId, onLike, specificLike, likes, onDelete);
  }

  async function onLike() {
    const data = await createLike({ bookId });
    console.log(data);
    ctx.page.redirect("/details/" + bookId);
  }

  async function onDelete() {
    await deleteBook(bookId);

    ctx.page.redirect("/");
  }
};
