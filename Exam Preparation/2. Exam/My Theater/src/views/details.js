import { deleteTheater, getTheaterById } from "../api/data.js";
import {
  createLike,
  getCountLikes,
  getSpecificUserLike,
} from "../api/likes.js";
import { html, until, nothing } from "../lib.js";

const detailsTemplate = (template) => html`
  <section id="detailsPage">
    ${until(template, html`<h1>Loading &hellip;</h1>`)}
  </section>
`;

const eventTemplate = (
  theater,
  user,
  isOwner,
  onDelete,
  onLike,
  userLike,
  theaterLikes
) => html`
  <div id="detailsBox">
    <div class="detailsInfo">
      <h1>Title: ${theater.title}</h1>
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
          ? html`<a
                @click=${onDelete}
                class="btn-delete"
                href="javascript:void(0)"
                >Delete</a
              >
              <a class="btn-edit" href="/edit/${theater._id}">Edit</a>`
          : nothing}
        ${user && !isOwner && userLike == 0
          ? html`<a
              @click=${(e) => onLike(e, theater._id)}
              class="btn-like"
              href="javascript:void(0)"
              >Like</a
            >`
          : nothing}
        <p class="likes">Likes: ${theaterLikes}</p>
      </div>
    </div>
  </div>
`;

export const detailsPage = (ctx) => {
  const user = ctx.userData();

  ctx.render(detailsTemplate(getTheater()));

  async function getTheater(userLike, theaterLikes) {
    userLike = userLike == undefined ? null : userLike;

    const data = await getTheaterById(ctx.params.id);
    if (user && userLike == undefined) {
      userLike = await getSpecificUserLike(ctx.params.id, user.id);
    }
    theaterLikes =
      theaterLikes == undefined
        ? await getCountLikes(ctx.params.id)
        : theaterLikes;

    const isOwner = user && data._ownerId == user.id;

    return eventTemplate(
      data,
      user || false,
      isOwner,
      onDelete,
      onLike,
      userLike,
      theaterLikes
    );
  }

  async function onDelete(e) {
    e.preventDefault();

    const question = confirm("Are you sure you want to delete this event?");

    if (question) {
      await deleteTheater(ctx.params.id);

      ctx.page.redirect("/profile");
    }
  }

  async function onLike(e, theaterId) {
    await createLike({ theaterId });
    const userLike = await getSpecificUserLike(ctx.params.id, user.id);
    const theaterLikes = await getCountLikes(ctx.params.id);
    ctx.render(detailsTemplate(getTheater(userLike, theaterLikes)));
  }
};
