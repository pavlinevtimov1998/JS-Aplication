import { deleteById } from "../api/data.js";
import { html } from "../lib.js";
import { userData } from "../util.js";

const detailsTemplate = (idea, onDelete) => html`
  <div class="container home some">
    <img class="det-img" src="${idea.img}" />
    <div class="desc">
      <h2 class="display-5">${idea.title}</h2>
      <p class="infoType">Description:</p>
      <p class="idea-description">${idea.description}</p>
    </div>
    <div class="text-center">
      ${userData()
        ? userData().id == idea._ownerId
          ? html`<a
              @click=${() => onDelete(idea._id)}
              class="btn detb"
              href="javascript:void(0)"
              >Delete</a
            >`
          : ""
        : ""}
    </div>
  </div>
`;

export const showDetails = (ctx) => {
  ctx.render(detailsTemplate(ctx.idea, onDelete.bind(null, ctx)));
};

async function onDelete(ctx, id) {
  await deleteById(id);

  ctx.page.redirect("/catalog");
}
