import { getAll } from "../api/data.js";
import { html, until } from "../lib.js";

const catalogTemplate = (allFurniture) => html`
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
        <img src="./images/table.png" />
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

export const catalogPage = (ctx) => {
  ctx.render(catalogTemplate(allFurniture()));
};

async function allFurniture() {
  const data = await getAll();

  return data.map((d) => furnitureTemplate(d));
}
