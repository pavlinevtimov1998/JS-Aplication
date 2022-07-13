import { html, until } from "../lib.js";
import { getAllIdeas } from "../api/data.js";

const catalogTemplate = (data) => html`
  <div id="dashboard-holder">${until(data, html`<p>Loading &hellip;</p>`)}</div>
`;

const ideaTemplate = (idea) => html`
  <div
    class="card overflow-hidden current-card details"
    style="width: 20rem; height: 18rem;"
  >
    <div class="card-body">
      <p class="card-text">${idea.title}</p>
    </div>
    <img class="card-image" src=${idea.img} alt="Card image cap" />
    <a class="btn" href="/details/${idea._id}">Details</a>
  </div>
`;

const noIdeasTemplate = () => html`<h1>No ideas yet! Be the first one :)</h1>`;

export const showCatalog = (ctx) => {
  ctx.render(catalogTemplate(showAllIdeas()));
};

async function showAllIdeas() {
  const data = await getAllIdeas();

  return data.length > 0 ? data.map((i) => ideaTemplate(i)) : noIdeasTemplate();
}
