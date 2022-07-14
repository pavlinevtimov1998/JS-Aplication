import { getAll, getUserFurniture } from "../api/data.js";
import { html, until } from "../lib.js";

const userCatalogTemplate = (allFurniture) => html`
  <div class="container">
    <div class="row space-top">
      <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
      </div>
    </div>

    <div class="row space-top">
      ${until(allFurniture, html`<p>Loading &hellip;</p>`)}
    </div>
  </div>
`;

const furnitureTemplate = (furniture) => html`
  <div class="col-md-4">
    <div class="card text-white bg-primary">
      <div class="card-body">
        <img src=${furniture.img} />
        <p>${furniture.description}</p>
        <footer>
          <p>Price: <span>${furniture.price} $</span></p>
        </footer>
        <div>
          <a href="/details/${furniture._id}" class="btn btn-info">Details</a>
        </div>
      </div>
    </div>
  </div>
`;

export const userFurniturePage = (ctx) => {
  ctx.render(userCatalogTemplate(userFurniture(ctx.userData().id)));
};

async function userFurniture(id) {
  const data = await getUserFurniture(id);

  return data.map((d) => furnitureTemplate(d));
}
