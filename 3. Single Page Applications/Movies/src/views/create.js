import { postMovie } from "../api/data.js";
import { html } from "../lib.js";

const createTemplate = () => html`
  <section id="add-movie" class="section">
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
  ctx.render(createTemplate());
}

// form.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   let formData = new FormData(e.currentTarget);

//   let [title, description, img] = [...formData.values()];

//   if (title == "" || description == "" || img == "") {
//     return alert("Empty inputs");
//   }

//   await postMovie({ title, description, img });

//   // [...form.querySelectorAll("input")].forEach((i) => (i.value = ""));

//   form.reset();

//   ctx.goTo("home", ctx);
// });
