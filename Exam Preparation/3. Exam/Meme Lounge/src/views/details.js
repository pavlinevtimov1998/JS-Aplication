import { getMemeById } from "../api/data.js";
import { html, until, nothing } from "../lib.js";

const detailsTemplate = (template) => html`
  <section id="meme-details">
    ${until(template, html`<h1>Loading &hellip;</h1>`)}
  </section>
`;

const infoTemplate = (meme, isOwner) => html`
  <h1>Meme Title: ${meme.title}</h1>
  <div class="meme-details">
    <div class="meme-img">
      <img alt="meme-alt" src=${meme.imageUrl} />
    </div>
    <div class="meme-description">
      <h2>Meme Description</h2>
      <p>${meme.description}</p>

      ${isOwner
        ? html`<a class="button warning" href="/edit/${meme._id}">Edit</a>
            <button class="button danger">Delete</button>`
        : nothing}
    </div>
  </div>
`;

export const detailsPage = (ctx) => {
  const user = ctx.userData();

  ctx.render(detailsTemplate(getMeme()));

  async function getMeme() {
    const meme = await getMemeById(ctx.params.id);

    ctx.meme = meme;

    const isOwner = user && user.id == meme._ownerId ? true : false;

    return infoTemplate(meme, isOwner);
  }
};
