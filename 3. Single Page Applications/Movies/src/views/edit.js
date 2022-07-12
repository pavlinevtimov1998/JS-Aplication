import { html } from "../lib.js";
import { updateById } from "../api/data.js";

const editTemplate = (movie, onSubmit) => html`
  <section id="edit-movie">
    <form
      @submit=${(e) => onSubmit(e)}
      class="text-center border border-light p-5"
      action="#"
      method=""
    >
      <h1>Edit Movie</h1>
      <div class="form-group">
        <label for="title">Movie Title</label>
        <input
          id="title"
          type="text"
          class="form-control"
          placeholder="Movie Title"
          .value=${movie.title}
          name="title"
        />
      </div>
      <div class="form-group">
        <label for="description">Movie Description</label>
        <textarea
          class="form-control"
          placeholder="Movie Description..."
          name="description"
          .value=${movie.description}
        ></textarea>
      </div>
      <div class="form-group">
        <label for="imageUrl">Image url</label>
        <input
          id="imageUrl"
          type="text"
          class="form-control"
          placeholder="Image Url"
          value=${movie.img}
          name="imageUrl"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </section>
`;

export const editPage = (ctx) => {
  ctx.render(editTemplate(ctx.movie, onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const [title, description, img] = [...formData.values()];

    if (title == "" || description == "" || img == "") {
      return;
    }

    await updateById(ctx.movie._id, { title, description, img });

    ctx.page.redirect(`/details/${ctx.movie._id}`);
  }
};
