import { createMovie } from "../api/data.js";
import { html } from "../lib.js";

const createTemplate = (onSubmit) => html`
  <section @submit=${(e) => onSubmit(e)} id="add-movie" class="section">
    <form class="text-center border border-light p-5" action="#" method="">
      <h1>Add Movie</h1>
      <div class="form-group">
        <label for="title">Movie Title</label>
        <input
          id="title"
          type="text"
          class="form-control"
          placeholder="Title"
          name="title"
          value=""
        />
      </div>
      <div class="form-group">
        <label for="description">Movie Description</label>
        <textarea
          class="form-control"
          placeholder="Description"
          name="description"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="imageUrl">Image url</label>
        <input
          id="imageUrl"
          type="text"
          class="form-control"
          placeholder="Image Url"
          name="imageUrl"
          value=""
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </section>
`;

export function createPage(ctx) {
  ctx.render(createTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    let formData = new FormData(e.target);

    let [title, description, img] = [...formData.values()];

    if (title == "" || description == "" || img == "") {
      return alert("Empty inputs");
    }

    await createMovie({ title, description, img });

    e.target.reset();

    ctx.page.redirect("/home");
  }
}
