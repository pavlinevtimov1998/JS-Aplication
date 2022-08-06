import { getAllOffers } from "../api/data.js";
import { html, until } from "../lib.js";

const catalogTemplate = (template) => html`
  <section id="dashboard">
    <h2>Job Offers</h2>
    ${until(
      template,
      html`<div class="offer">
        <h3>Loading &hellip;</h3>
      </div>`
    )}
  </section>
`;

const offerTemplate = (offer) => html`
  <div class="offer">
    <img src=${offer.imageUrl} alt="example1" />
    <p><strong>Title: </strong><span class="title">${offer.title}</span></p>
    <p><strong>Salary:</strong><span class="salary">${offer.salary}</span></p>
    <a class="details-btn" href="/details/${offer._id}">Details</a>
  </div>
`;

const noOfferTemplate = () => html` <h2>No offers yet.</h2> `;

export const catalogPage = (ctx) => {
  ctx.render(catalogTemplate(getOffers()));

  async function getOffers() {
    const offers = await getAllOffers();

    return offers.length > 0
      ? offers.map((o) => offerTemplate(o))
      : noOfferTemplate();
  }
};
