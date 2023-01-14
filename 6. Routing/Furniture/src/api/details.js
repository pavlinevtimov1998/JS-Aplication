import { deleteById, getById } from "../api/data.js";
import { html, until } from "../lib.js";

const detailsTemplate = (furniture) => html`
  <div class="container">
    <div class="row space-top">
      <div class="col-md-12">
        <h1>Furniture Details</h1>
      </div>
    </div>
    ${until(furniture, html`<p>Loading &hellip;</p>`)}
  </div>
`;

const itemTemplate = (furniture, onDelete, onUpdate) => html`
  <div class="row space-top">
    <div class="col-md-4">
      <div class="card text-white bg-primary">
        <div class="card-body">
          <img src=${furniture.img} />
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <p>Make: <span>${furniture.make}</span></p>
      <p>Model: <span>${furniture.model}</span></p>
      <p>Year: <span>${furniture.year}</span></p>
      <p>Description: <span>${furniture.description}</span></p>
      <p>Price: <span>${furniture.price}</span></p>
      ${furniture.material
        ? html`<p>Material: <span>${furniture.material}</span></p>`
        : ""}
      <div>
        <a href="/edit/${furniture._id}" class="btn btn-info">Edit</a>
        <a
          @click=${() => onDelete()}
          href="javascript:void(0)"
          class="btn btn-red"
          >Delete</a
        >
      </div>
    </div>
  </div>
`;

export const detailsPage = (ctx) => {
  ctx.render(detailsTemplate(getItem(ctx)));
};

async function getItem(ctx) {
  const item = await getById(ctx.params.id);

  return itemTemplate(item, onDelete.bind(null, ctx, item._id));
}

async function onDelete(ctx, id) {
  await deleteById(id);

  ctx.page.redirect("/catalog");
}
