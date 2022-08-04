import { getOne } from "../api/data.js";
import { html, until } from "../lib.js";

const detailsTemplate = (tempalte) => html`
  <section id="listing-details">
    <h1>Details</h1>
    ${until(tempalte, html`<p>Loading &hellip;</p>`)}
  </section>
`;

const carTemplate = (car) => html`
  <div class="details-info">
    <img src=${car.imageUrl} />
    <hr />
    <ul class="listing-props">
      <li><span>Brand:</span>${car.brand}</li>
      <li><span>Model:</span>${car.model}</li>
      <li><span>Year:</span>${car.year}</li>
      <li><span>Price:</span>${car.price}$</li>
    </ul>

    <p class="description-para">${car.description}</p>

    <div class="listings-buttons">
      <a href="/edit/${car._id}" class="button-list">Edit</a>
      <a href="javascript:void(0)" class="button-list">Delete</a>
    </div>
  </div>
`;

export const detailsPage = (ctx) => {
  ctx.render(detailsTemplate(getCar()));

  async function getCar() {
    const car = await getOne(ctx.params.id);

    return carTemplate(car);
  }
};
