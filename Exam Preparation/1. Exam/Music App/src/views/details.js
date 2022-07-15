import { deleteById, getById } from "../api/data.js";
import { html, until, nothing } from "../lib.js";

const detailsTemplate = (item) => html`
  <section id="detailsPage">
    ${until(item, html`<p>Loading &hellip;</p>`)}
  </section>
`;

const itemTemplate = (item, isCreator, id, onDelete) => html`
  <div class="wrapper">
    <div class="albumCover">
      <img src="${item.imgUrl}" />
    </div>
    <div class="albumInfo">
      <div class="albumText">
        <h1>Name: ${item.name}</h1>
        <h3>Artist: ${item.artist}</h3>
        <h4>Genre: ${item.genre}</h4>
        <h4>Price: ${item.price}</h4>
        <h4>Date: ${item.releaseDate}</h4>
        <p>${item.description}</p>
      </div>

      ${isCreator
        ? html`<div class="actionBtn">
            <a href="/edit/${id}" class="edit">Edit</a>
            <a
              @click=${(e) => onDelete(e)}
              href="javascript:void(0)"
              class="remove"
              >Delete</a
            >
          </div>`
        : nothing}
    </div>
  </div>
`;

export const detailsPage = (ctx) => {
  ctx.render(detailsTemplate(getItem(ctx)));
};

async function getItem(ctx) {
  const item = await getById(ctx.params.id);

  const isCreator = ctx.userData() && ctx.userData().id == item._ownerId;

  return itemTemplate(item, isCreator, ctx.params.id, onDelete.bind(null, ctx));
}

async function onDelete(ctx, e) {
  e.preventDefault();

  await deleteById(ctx.params.id);

  ctx.page.redirect("/catalog");
}
