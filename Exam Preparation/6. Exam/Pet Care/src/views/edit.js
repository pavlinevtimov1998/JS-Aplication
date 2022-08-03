import { editAnimal } from "../api/data.js";
import { html, until } from "../lib.js";

const editTemplate = (animal, onSubmit) => html`
  <section id="editPage">
    <form @submit=${onSubmit} class="editForm">
      <img src=${animal.image} />
      <div>
        <h2>Edit PetPal</h2>
        <div class="name">
          <label for="name">Name:</label>
          <input name="name" id="name" type="text" .value=${animal.name} />
        </div>
        <div class="breed">
          <label for="breed">Breed:</label>
          <input name="breed" id="breed" type="text" .value=${animal.breed} />
        </div>
        <div class="Age">
          <label for="age">Age:</label>
          <input name="age" id="age" type="text" .value=${animal.age} />
        </div>
        <div class="weight">
          <label for="weight">Weight:</label>
          <input
            name="weight"
            id="weight"
            type="text"
            .value=${animal.weight}
          />
        </div>
        <div class="image">
          <label for="image">Image:</label>
          <input name="image" id="image" type="text" .value=${animal.image} />
        </div>
        <button class="btn" type="submit">Edit Pet</button>
      </div>
    </form>
  </section>
`;

export const editPage = (ctx) => {
  ctx.render(editTemplate(ctx.animal, onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const name = formData.get("name");
    const breed = formData.get("breed");
    const age = formData.get("age");
    const weight = formData.get("weight");
    const image = formData.get("image");

    if (name == "" || breed == "" || age == "" || weight == "" || image == "") {
      return alert("All fields required!");
    }

    await editAnimal(ctx.params.id, { name, breed, age, weight, image });

    ctx.page.redirect("/details/" + ctx.params.id);
  }
};
