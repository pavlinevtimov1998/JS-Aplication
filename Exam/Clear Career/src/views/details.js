import { addApplication, deleteOffer } from "../api/data.js";
import { html, until, nothing } from "../lib.js";

const detailsTemplate = (
  offer,
  userId,
  onDelete,
  totalApps,
  apply,
  specificApp
) => html`
  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src=${offer.imageUrl} alt="example1" />
      <p id="details-title">${offer.title}</p>
      <p id="details-category">
        Category: <span id="categories">${offer.category}</span>
      </p>
      <p id="details-salary">Salary: <span id="salary-number">7000</span></p>
      <div id="info-wrapper">
        <div id="details-description">
          <h4>Description</h4>
          <span>${offer.description}</span>
        </div>
        <div id="details-requirements">
          <h4>Requirements</h4>
          <span>${offer.requirements}</span>
        </div>
      </div>
      <p>Applications: <strong id="applications">${totalApps}</strong></p>

      <div id="action-buttons">
        ${userId == offer._ownerId
          ? html`<a href="/edit/${offer._id}" id="edit-btn">Edit</a>
              <a @click=${onDelete} href="javascript:void(0)" id="delete-btn"
                >Delete</a
              >`
          : nothing}
        ${userId && userId !== offer._ownerId && specificApp == 0
          ? html`<a @click=${apply} href="javascript:void(0)" id="apply-btn"
              >Apply</a
            >`
          : nothing}
      </div>
    </div>
  </section>
`;

export const detailsPage = (ctx) => {
  const userId = ctx.userData() ? ctx.userData().id : undefined;

  ctx.render(
    detailsTemplate(
      ctx.offer,
      userId,
      onDelete,
      ctx.totalApps,
      apply,
      ctx.specificApp
    )
  );

  async function apply() {
    await addApplication({ offerId: ctx.offer._id });

    ctx.page.redirect("/details/" + ctx.params.id);
  }

  async function onDelete() {
    await deleteOffer(ctx.params.id);

    ctx.page.redirect("/catalog");
  }
};
