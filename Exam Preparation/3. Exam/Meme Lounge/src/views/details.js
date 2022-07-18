import { getMemeById } from "../api/data.js";
import { html, until, nothing } from "../lib.js";

const detailsTemplate = (template) => html`
  <section id="meme-details">${template}</section>
`;

const infoTemplate = (meme, user) => html`
  <h1>Meme Title: ${meme.title}</h1>
  <div class="meme-details">
    <div class="meme-img">
      <img alt="meme-alt" src=${meme.imageUrl} />
    </div>
    <div class="meme-description">
      <h2>Meme Description</h2>
      <p>${meme.description}</p>

      ${user && user.id == meme._ownerId
        ? html`<a class="button warning" href="/edit/${meme._id}">Edit</a>
            <button class="button danger">Delete</button>`
        : nothing}
    </div>
  </div>
`;

export const detailsPage = (ctx) => {
  const user = ctx.userData();

  ctx.render(detailsTemplate(infoTemplate(ctx.meme, user)));
};
