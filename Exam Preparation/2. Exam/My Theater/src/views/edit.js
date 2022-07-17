import { editTheater, getTheaterById } from "../api/data.js";
import { html, until } from "../lib.js";

const editTemplate = (template) => html`
  <section id="editPage">
    ${until(template, html`<h1>Loading &hellip;</h1>`)}
  </section>
`;

const formTemplate = (theater, onSubmit) => html`
  <form @submit=${onSubmit} class="theater-form">
    <h1>Edit Theater</h1>
    <div>
      <label for="title">Title:</label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="Theater name"
        .value=${theater.title}
      />
    </div>
    <div>
      <label for="date">Date:</label>
      <input
        id="date"
        name="date"
        type="text"
        placeholder="Month Day, Year"
        .value=${theater.date}
      />
    </div>
    <div>
      <label for="author">Author:</label>
      <input
        id="author"
        name="author"
        type="text"
        placeholder="Author"
        .value=${theater.author}
      />
    </div>
    <div>
      <label for="description">Theater Description:</label>
      <textarea
        id="description"
        name="description"
        placeholder="Description"
        .value=${theater.description}
      ></textarea>
    </div>
    <div>
      <label for="imageUrl">Image url:</label>
      <input
        id="imageUrl"
        name="imageUrl"
        type="text"
        placeholder="Image Url"
        value=${theater.imageUrl}
      />
    </div>
    <button class="btn" type="submit">Submit</button>
  </form>
`;

export const editPage = (ctx) => {
  ctx.render(editTemplate(getTheatre()));

  async function getTheatre() {
    const theater = await getTheaterById(ctx.params.id);
    
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

      await editTheater(ctx.params.id, data);

      ctx.page.redirect(`/details/${ctx.params.id}`);
    }

    return formTemplate(theater, onSubmit);
  }
};
