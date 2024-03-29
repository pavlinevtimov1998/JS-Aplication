import { html } from "../lib.js";
import { createTheater } from "../api/data.js";

const createTemplate = (onSubmit) => html`
  <section id="createPage">
    <form @submit=${onSubmit} class="create-form">
      <h1>Create Theater</h1>
      <div>
        <label for="title">Title:</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Theater name"
          value=""
        />
      </div>
      <div>
        <label for="date">Date:</label>
        <input
          id="date"
          name="date"
          type="text"
          placeholder="Month Day, Year"
        />
      </div>
      <div>
        <label for="author">Author:</label>
        <input id="author" name="author" type="text" placeholder="Author" />
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea
          id="description"
          name="description"
          placeholder="Description"
        ></textarea>
      </div>
      <div>
        <label for="imageUrl">Image url:</label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="text"
          placeholder="Image Url"
          value=""
        />
      </div>
      <button class="btn" type="submit">Submit</button>
    </form>
  </section>
`;

export const createPage = (ctx) => {
  ctx.render(createTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const formData = [...new FormData(e.target).entries()];

    for (let [_, value] of formData) {
      if (value.trim() == "") {
        return alert("All fields required!");
      }
    }

    const data = formData.reduce(
      (a, [k, v]) => Object.assign(a, { [k]: v.trim() }),
      {}
    );

    await createTheater(data);

    ctx.page.redirect('/home');
  }
};
