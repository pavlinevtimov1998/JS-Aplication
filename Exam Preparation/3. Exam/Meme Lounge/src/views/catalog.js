import { getAllMemes } from "../api/data.js";
import { html, until } from "../lib.js";

const catalogTemplate = (memes) => html`
  <!-- All Memes Page ( for Guests and Users )-->
  <section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">${until(memes, html`<h1>Loading &hellip;</h1>`)}</div>
  </section>
`;

const memeTemplate = (meme) => html`
  <div class="meme">
    <div class="card">
      <div class="info">
        <p class="meme-title">${meme.title}</p>
        <img class="meme-image" alt="meme-img" src=${meme.imageUrl} />
      </div>
      <div id="data-buttons">
        <a class="button" href="/details/${meme._id}">Details</a>
      </div>
    </div>
  </div>
`;

const noMemesTemplate = () => html`
  <p class="no-memes">No memes in database.</p>
`;

export const catalogPage = (ctx) => {
  ctx.render(catalogTemplate(getMemes()));

  async function getMemes() {
    const data = await getAllMemes();

    return data.length > 0
      ? data.map((d) => memeTemplate(d))
      : noMemesTemplate();
  }
};
