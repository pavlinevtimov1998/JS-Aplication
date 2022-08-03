import {
  delAnimal,
  getDonations,
  getOne,
  getSpecificDonation,
  makeDonation,
} from "../api/data.js";
import { html, until, nothing } from "../lib.js";

const detailsTemplate = (template) => html`
  <section id="detailsPage">
    ${until(template, html`<p>Loading &hellip;</p>`)}
  </section>
`;

const animalTemplate = (
  animal,
  userId,
  totalDonation,
  donate,
  specificDonate,
  deleteAnimal
) => html`
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
        <h4 class="donation">Donation: ${totalDonation * 100}$</h4>
      </div>
      ${userId
        ? html`<div class="actionBtn">
            ${userId == animal._ownerId
              ? html`<a href="/edit/${animal._id}" class="edit">Edit</a>
                  <a
                    @click=${deleteAnimal}
                    href="javascript:void(0)"
                    class="remove"
                    >Delete</a
                  >`
              : html`
                  ${specificDonate == 0
                    ? html`<a
                        @click=${donate}
                        href="javascript:void(0)"
                        class="donate"
                        >Donate</a
                      >`
                    : nothing}
                `}
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
    let specificDonate = null;

    const [animal, totalDonation] = await Promise.all([
      getOne(animalId),
      getDonations(animalId),
    ]);

    if (userId) {
      specificDonate = await getSpecificDonation(animalId, userId);
    }

    return animalTemplate(
      animal,
      userId,
      totalDonation,
      donate,
      specificDonate,
      deleteAnimal
    );
  }

  async function donate() {
    const data = await makeDonation({ petId: animalId });

    ctx.page.redirect("/details/" + animalId);
  }

  async function deleteAnimal() {
    await delAnimal(animalId);

    ctx.page.redirect("/catalog");
  }
};
