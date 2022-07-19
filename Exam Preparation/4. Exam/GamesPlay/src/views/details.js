import { getAllComments, postComment } from "../api/comments.js";
import { deleteGame } from "../api/data.js";
import { html, nothing } from "../lib.js";

const detailsTemplate = (game, isOwner, onDelete, template) => html`
  <section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">
      <div class="game-header">
        <img class="game-img" src=${game.imageUrl} />
        <h1>${game.title}</h1>
        <span class="levels">MaxLevel: ${game.maxLevel}</span>
        <p class="type">${game.category}</p>
      </div>
      <p class="text">${game.summary}</p>
      ${isOwner
        ? html`<div class="buttons">
            <a href="/edit/${game._id}" class="button">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button"
              >Delete</a
            >
          </div>`
        : nothing}
      ${template}
    </div>
  </section>
`;

export const detailsPage = (ctx) => {
  const user = ctx.userData();
  const isUser = user ? true : false;
  const isOwner = isUser && user.id == ctx.game._ownerId;

  ctx.render(
    detailsTemplate(
      ctx.game,
      isOwner,
      onDelete,
      commentsTemplate(
        isOwner,
        isUser,
        ctx.comments,
        commentFormTemplate(onSubmit)
      )
    )
  );

  async function onSubmit(e) {
    e.preventDefault();

    const data = new FormData(e.target);

    const comment = data.get("comment");

    if (comment == "") {
      return;
    }

    await postComment({ gameId: ctx.params.id, comment });

    document.querySelector(".create-comment textarea").value = "";
    ctx.page.redirect(`/details/${ctx.params.id}`);
  }

  async function onDelete(e) {
    e.preventDefault();

    await deleteGame(ctx.params.id);

    ctx.page.redirect("/home");
  }
};

const commentsTemplate = (isOwner, isUser, data, form) => html`
  <div class="details-comments">
    <h2>Comments:</h2>
    <ul>
      ${data.length > 0
        ? html`
            ${data.map(
              (c) => html` <li class="comment">
                <p>${c.comment}</p>
              </li>`
            )}
          `
        : html` <p class="no-comment">No comments.</p> `}
    </ul>
  </div>
  ${!isOwner && isUser ? form : nothing}
`;

const commentFormTemplate = (onSubmit) => html`
  <article class="create-comment">
    <label>Add new comment:</label>
    <form @submit=${onSubmit} class="form">
      <textarea name="comment" placeholder="Comment......"></textarea>
      <input class="btn submit" type="submit" value="Add Comment" />
    </form>
  </article>
`;
