import { getAll } from "../api/data.js";
import { html, until } from "../lib.js";

const catalogTemplate = (template) => html`
  <section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings">
      ${until(template, html`<p>Loading &hellip;</p>`)}
    </div>
  </section>
`;

const carTemplate = (car) => html`
  <div class="listing">
    <div class="preview">
      <img src=${car.imageUrl} />
    </div>
    <h2>${car.brand} ${car.model}</h2>
    <div class="info">
      <div class="data-info">
        <h3>Year: ${car.year}</h3>
        <h3>Price: ${car.price} $</h3>
      </div>
      <div class="data-buttons">
        <a href="/details/${car._id}" class="button-carDetails">Details</a>
      </div>
    </div>
  </div>
`;

const noCarsTemplate = () => html`
  <p class="no-cars">No cars in database.</p>
`;

export const catalogPage = (ctx) => {
  ctx.render(catalogTemplate(getCars()));

  async function getCars() {
    const cars = await getAll();

    return cars.length > 0 ? cars.map((c) => carTemplate(c)) : noCarsTemplate();
  }
};
