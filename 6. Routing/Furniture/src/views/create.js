import { createFurniture } from "../api/data.js";
import { html } from "../lib.js";

const createTemplate = (onSubmit, errMessage, errors) => html`
  <div class="container">
    <div class="row space-top">
      <div class="col-md-12">
        <h1>Create New Furniture</h1>
        <p>Please fill all fields.</p>
      </div>
    </div>
    ${errMessage
      ? html`<div class="form-group error">${errMessage}</div>`
      : null}
    <form @submit=${(e) => onSubmit(e)}>
      <div class="row space-top">
        <div class="col-md-4">
          <div class="form-group">
            <label class="form-control-label" for="new-make">Make</label>
            <input
              class=${"form-control valid" +
              (errors.make ? " is-invalid" : "is-valid")}
              id="new-make"
              type="text"
              name="make"
            />
          </div>
          <div class="form-group has-success">
            <label class="form-control-label" for="new-model">Model</label>
            <input
              class=${"form-control valid" +
              (errors.model ? " is-invalid" : "is-valid")}
              id="new-model"
              type="text"
              name="model"
            />
          </div>
          <div class="form-group has-danger">
            <label class="form-control-label" for="new-year">Year</label>
            <input
              class=${"form-control valid" +
              (errors.year ? " is-invalid" : "is-valid")}
              id="new-year"
              type="number"
              name="year"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="new-description"
              >Description</label
            >
            <input
              class=${"form-control valid" +
              (errors.description ? " is-invalid" : "is-valid")}
              id="new-description"
              type="text"
              name="description"
            />
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label class="form-control-label" for="new-price">Price</label>
            <input
              class=${"form-control valid" +
              (errors.price ? " is-invalid" : "is-valid")}
              id="new-price"
              type="number"
              name="price"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="new-image">Image</label>
            <input
              class=${"form-control valid" +
              (errors.img ? " is-invalid" : "is-valid")}
              id="new-image"
              type="text"
              name="img"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="new-material"
              >Material (optional)</label
            >
            <input
              class="form-control"
              id="new-material"
              type="text"
              name="material"
            />
          </div>
          <input type="submit" class="btn btn-primary" value="Create" />
        </div>
      </div>
    </form>
  </div>
`;

export const createPage = (ctx) => {
  update(null, {});

  function update(errMessage, errors) {
    ctx.render(createTemplate(onSubmit, errMessage, errors));
  }
  async function onSubmit(e) {
    e.preventDefault();

    const formData = [...new FormData(e.target).entries()];

    const data = formData.reduce(
      (a, [k, v]) => Object.assign(a, { [k]: v }),
      {}
    );

    const missing = Object.entries(data).filter(
      ([k, v]) => k != "material" && v == ""
    );

    try {
      if (missing.length > 0) {
        const errors = missing.reduce(
          (a, [k, v]) => Object.assign(a, { [k]: true }),
          {}
        );

        throw {
          error: new Error("All fields are required!"),
          errors,
        };
      }

      data.year = Number(data.year);
      data.price = Number(data.price);

      const result = await createFurniture(data);

      ctx.page.redirect(`/details/${result._id}`);
    } catch (err) {
      const message = err.message || err.error.message;
      update(message, err.errors);
    }
  }
};
