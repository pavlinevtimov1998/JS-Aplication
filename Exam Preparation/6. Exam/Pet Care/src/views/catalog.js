import { getAll } from "../api/data.js";
import { html, until } from "../lib.js";

const catalogTemplate = (template) => html`
  <section id="dashboard">
    <h2 class="dashboard-title">Services for every animal</h2>
    <div class="animals-dashboard">
      ${until(template, html`<p>Loading &hellip;</p>`)}
    </div>
  </section>
`;

const animalTemplate = (animal) => html`
  <div class="animals-board">
    <article class="service-img">
      <img class="animal-image-cover" src="${animal.image}" />
    </article>
    <h2 class="name">${animal.name}</h2>
    <h3 class="breed">${animal.breed}</h3>
    <div class="action">
      <a class="btn" href="/details/${animal._id}">Details</a>
    </div>
  </div>
`;

const noAnimalsTemplate = () => html`
  <div>
    <p class="no-pets">No pets in dashboard</p>
  </div>
`;

export const catalogPage = (ctx) => {
  ctx.render(catalogTemplate(getAllAnimals()));

  async function getAllAnimals() {
    const animals = await getAll();

    return animals.length > 0
      ? animals.map((a) => animalTemplate(a))
      : noAnimalsTemplate();
  }
};
