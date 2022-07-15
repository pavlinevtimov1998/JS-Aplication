import { getAll } from "../api/data.js";
import { html, until, nothing } from "../lib.js";

const catalogTemplate = (items) => html`
  <section id="catalogPage">
    <h1>All Albums</h1>
    ${until(items, html`<p>Loading &hellip;</p>`)}
  </section>
`;

const itemTemplate = (item, ctx) => html`
  <div class="card-box">
    <img src=${item.imgUrl} />
    <div>
      <div class="text-center">
        <p class="name">Name: ${item.name}</p>
        <p class="artist">Artist: ${item.artist}</p>
        <p class="genre">Genre: ${item.genre}</p>
        <p class="price">Price: ${item.price}</p>
        <p class="date">Release Date: ${item.releaseDate}</p>
      </div>
      ${ctx.userData()
        ? html`<div class="btn-group">
            <a href="/details/${item._id}" id="details">Details</a>
          </div>`
        : nothing}
    </div>
  </div>
`;

const emptyCatalogTemplate = () => html` <p>No Albums in Catalog!</p> `;

export const catalogPage = (ctx) => {
  ctx.render(catalogTemplate(getItems(ctx)));
};

async function getItems(ctx) {
  const data = await getAll();

  return data.length > 0
    ? data.map((d) => itemTemplate(d, ctx))
    : emptyCatalogTemplate();
}
