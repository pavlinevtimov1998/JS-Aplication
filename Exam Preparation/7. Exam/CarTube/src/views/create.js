import { createCar } from "../api/data.js";
import { html } from "../lib.js";

const createTemplate = (onSubmit) => html`
  <section id="create-listing">
    <div class="container">
      <form @submit=${onSubmit} id="create-form">
        <h1>Create Car Listing</h1>
        <p>Please fill in this form to create an listing.</p>
        <hr />

        <p>Car Brand</p>
        <input type="text" placeholder="Enter Car Brand" name="brand" />

        <p>Car Model</p>
        <input type="text" placeholder="Enter Car Model" name="model" />

        <p>Description</p>
        <input type="text" placeholder="Enter Description" name="description" />

        <p>Car Year</p>
        <input type="number" placeholder="Enter Car Year" name="year" />

        <p>Car Image</p>
        <input type="text" placeholder="Enter Car Image" name="imageUrl" />

        <p>Car Price</p>
        <input type="number" placeholder="Enter Car Price" name="price" />

        <hr />
        <input type="submit" class="registerbtn" value="Create Listing" />
      </form>
    </div>
  </section>
`;

export const createPage = (ctx) => {
  ctx.render(createTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const brand = formData.get("brand");
    const model = formData.get("model");
    const description = formData.get("description");
    const year = formData.get("year");
    const imageUrl = formData.get("imageUrl");
    const price = formData.get("price");

    if (
      brand == "" ||
      model == "" ||
      description == "" ||
      year == "" ||
      imageUrl == "" ||
      price == ""
    ) {
      return alert("All fields are required!");
    }

    await createCar({ brand, model, description, year, imageUrl, price });

    ctx.page.redirect("/catalog");
  }
};
