import { getAllGames } from "../api/data.js";
import { html, until } from "../lib.js";
import { spinner } from "../util.js";

const catalogTemplate = (template) => html`
  <section id="catalog-page">
    <h1>All Games</h1>
    ${until(template, spinner())}
  </section>
`;

const gameTemplate = (game) => html`
  <div class="allGames">
    <div class="allGames-info">
      <img src="./images/avatar-1.jpg" />
      <h6>Action</h6>
      <h2>Cover Fire</h2>
      <a href="/details/${game._id}" class="details-button">Details</a>
    </div>
  </div>
`;

const noGamesTemplate = () =>
  html`<h3 class="no-articles">No articles yet</h3>`;

export const catalogPage = (ctx) => {
  ctx.render(catalogTemplate(getGames()));

  async function getGames() {
    const data = await getAllGames();

    return data.length > 0
      ? data.map((d) => gameTemplate(d))
      : noGamesTemplate();
  }
};
