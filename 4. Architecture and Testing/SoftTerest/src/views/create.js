import { html } from "../lib.js";
import { createIdea } from "../api/data.js";

const createTemplate = (onSubmit) => html`
  <div id="create-page" class="container home wrapper my-md-5 pl-md-5">
    <div class="d-md-flex flex-mb-equal">
      <div class="col-md-6">
        <img
          class="responsive-ideas create"
          src="./images/creativity_painted_face.jpg"
          alt=""
        />
      </div>
      <form @submit=${(e) => onSubmit(e)} class="form-idea col-md-5">
        <div class="text-center mb-4">
          <h1 class="h3 mb-3 font-weight-normal">Share Your Idea</h1>
        </div>
        <div class="form-label-group">
          <label for="ideaTitle">Title</label>
          <input
            type="text"
            id="ideaTitle"
            name="title"
            class="form-control"
            placeholder="What is your idea?"
            autofocus=""
          />
        </div>
        <div class="form-label-group">
          <label for="ideaDescription">Description</label>
          <textarea
            type="text"
            name="description"
            class="form-control"
            placeholder="Description"
          ></textarea>
        </div>
        <div class="form-label-group">
          <label for="inputURL">Add Image</label>
          <input
            type="text"
            id="inputURL"
            name="imageURL"
            class="form-control"
            placeholder="Image URL"
          />
        </div>
        <button class="btn btn-lg btn-dark btn-block" type="submit">
          Create
        </button>

        <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2021.</p>
      </form>
    </div>
  </div>
`;

export const showCreate = (ctx) => {
  ctx.render(createTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const title = formData.get("title").trim();
    const description = formData.get("description").trim();
    const img = formData.get("imageURL").trim();

    if (title.length < 6) {
      return alert("Title should be at least 6 characters!");
    }
    if (description.length < 10) {
      return alert("Description should be at least 10 characters!");
    }
    if (img.length < 5) {
      return alert("Image should be at least 5 characters!");
    }

    await createIdea({ title, description, img });

    e.target.reset();

    ctx.page.redirect("/catalog");
  }
};
