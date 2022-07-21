import { html, styleMap } from "../lib.js";
import { editMovie } from "../api/data.js";

const editTemplate = (movie, onSubmit, message, errors) => html`
  <section id="edit-movie">
    <form
      @submit=${(e) => onSubmit(e)}
      class="text-center border border-light p-5"
      action="#"
      method=""
    >
      <h1>Edit Movie</h1>
      <p
        class="error"
        style=${styleMap(message ? { display: "block" } : { display: "none" })}
      >
        ${message}
      </p>
      <div class="form-group">
        <label for="title">Movie Title</label>
        <input
          id="title"
          type="text"
          class="form-control"
          style=${styleMap(
            errors.title ? { backgroundColor: "rgb(255, 236, 236)" } : ""
          )}
          placeholder="Movie Title"
          .value=${movie.title}
          name="title"
        />
      </div>
      <div class="form-group">
        <label for="description">Movie Description</label>
        <textarea
          class="form-control"
          style=${styleMap(
            errors.description ? { backgroundColor: "rgb(255, 236, 236)" } : ""
          )}
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
          style=${styleMap(
            errors.img ? { backgroundColor: "rgb(255, 236, 236)" } : ""
          )}
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
  update(false, {});

  function update(message, errors) {
    ctx.render(editTemplate(ctx.movie, onSubmit, message, errors));
  }

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const [title, description, img] = [...formData.values()];

    try {
      if (title == "" || description == "" || img == "") {
        throw {
          error: new Error("All fields required!"),
          errors: {
            title: title == "",
            description: description == "",
            img: img == "",
          },
        };
      }

      await editMovie(ctx.movie._id, { title, description, img });

      ctx.page.redirect(`/details/${ctx.movie._id}`);
    } catch (err) {
      update(err.error.message, err.errors);
    }
  }
};
