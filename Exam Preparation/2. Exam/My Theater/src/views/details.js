import { deleteTheater, getTheaterById } from "../api/data.js";
import { html, until, nothing } from "../lib.js";

const detailsTemplate = (template) => html`
  <section id="detailsPage">
    ${until(template, html`<h1>Loading &hellip;</h1>`)}
  </section>
`;

const eventTemplate = (theater, user, isOwner, onDelete) => html`
  <div id="detailsBox">
    <div class="detailsInfo">
      <h1>${theater.title}</h1>
      <div>
        <img src="${theater.imageUrl}" />
      </div>
    </div>

    <div class="details">
      <h3>Theater Description</h3>
      <p>${theater.description}</p>
      <h4>Date: ${theater.date}</h4>
      <h4>Author: ${theater.author}</h4>
      <div class="buttons">
        ${isOwner
          ? html`<a @click=${onDelete} class="btn-delete" href="/profile"
                >Delete</a
              >
              <a class="btn-edit" href="/edit/${theater._id}">Edit</a>`
          : nothing}
        ${user && !isOwner
          ? html`<a class="btn-like" href="#">Like</a>`
          : nothing}
      </div>
      <p class="likes">Likes: 0</p>
    </div>
  </div>
`;

export const detailsPage = (ctx) => {
  const user = ctx.userData();

  ctx.render(detailsTemplate(getTheater()));

  async function getTheater() {
    const data = await getTheaterById(ctx.params.id);

    const isOwner = user && data._ownerId == user.id;

    return eventTemplate(data, user || false, isOwner, onDelete);
  }

  async function onDelete() {
    await deleteTheater(ctx.params.id);
  }
};
