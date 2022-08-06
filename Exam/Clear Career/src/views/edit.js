import { editOffer } from "../api/data.js";
import { html, until } from "../lib.js";

const editTemplate = (offer, onSubmit) => html`
  <section id="edit">
    <div class="form">
      <h2>Edit Offer</h2>
      <form @submit=${onSubmit} class="edit-form">
        <input
          type="text"
          name="title"
          id="job-title"
          placeholder="Title"
          .value=${offer.title}
        />
        <input
          type="text"
          name="imageUrl"
          id="job-logo"
          placeholder="Company logo url"
          .value=${offer.imageUrl}
        />
        <input
          type="text"
          name="category"
          id="job-category"
          placeholder="Category"
          .value=${offer.category}
        />
        <textarea
          id="job-description"
          name="description"
          placeholder="Description"
          rows="4"
          cols="50"
          .value=${offer.description}
        ></textarea>
        <textarea
          id="job-requirements"
          name="requirements"
          placeholder="Requirements"
          rows="4"
          cols="50"
          .value=${offer.requirements}
        ></textarea>
        <input
          type="text"
          name="salary"
          id="job-salary"
          placeholder="Salary"
          .value=${offer.salary}
        />

        <button type="submit">post</button>
      </form>
    </div>
  </section>
`;

export const editPage = (ctx) => {
  ctx.render(editTemplate(ctx.offer, onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const title = formData.get("title");
    const imageUrl = formData.get("imageUrl");
    const category = formData.get("category");
    const description = formData.get("description");
    const requirements = formData.get("requirements");
    const salary = formData.get("salary");

    if (
      title == "" ||
      imageUrl == "" ||
      category == "" ||
      description == "" ||
      requirements == "" ||
      salary == ""
    ) {
      return alert("All fields required!");
    }

    await editOffer(ctx.params.id, {
      title,
      imageUrl,
      category,
      description,
      requirements,
      salary,
    });

    ctx.page.redirect("/catalog");
  }
};
