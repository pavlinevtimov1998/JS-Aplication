import { getOne } from "../api/data.js";
import { html, until, nothing } from "../lib.js";

const detailsTemplate = (template) => html`
  <section id="detailsPage">
    ${until(template, html`<p>Loading &hellip;</p>`)}
  </section>
`;

const animalTemplate = (animal, userId) => html`
  <div class="details">
    <div class="animalPic">
      <img src="${animal.image}" />
    </div>
    <div>
      <div class="animalInfo">
        <h1>Name: ${animal.name}</h1>
        <h3>Breed: ${animal.breed}</h3>
        <h4>Age: ${animal.age}</h4>
        <h4>Weight: ${animal.weight}</h4>
        <h4 class="donation">Donation: 0$</h4>
      </div>
      ${userId
        ? html`<div class="actionBtn">
            ${userId == animal._ownerId
              ? html`<a href="/edit/${animal._id}" class="edit">Edit</a>
                  <a href="#" class="remove">Delete</a>`
              : html`<a href="#" class="donate">Donate</a>`}
          </div>`
        : nothing}
    </div>
  </div>
`;

export const detailsPage = (ctx) => {
  const userId = ctx.userData() ? ctx.userData().id : undefined;
  const animalId = ctx.params.id;

  ctx.render(detailsTemplate(getAnimal()));

  async function getAnimal() {
    const animal = await getOne(animalId);

    return animalTemplate(animal, userId);
  }
};
