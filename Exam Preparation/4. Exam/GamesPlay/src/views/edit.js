import { editGame } from "../api/data.js";
import { html, until } from "../lib.js";

const editTemplate = (game, onSubmit) => html`
  <section id="edit-page" class="auth">
    <form @submit=${onSubmit} id="edit">
      <div class="container">
        <h1>Edit Game</h1>
        <label for="leg-title">Legendary title:</label>
        <input type="text" id="title" name="title" .value=${game.title} />

        <label for="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          .value=${game.category}
        />

        <label for="levels">MaxLevel:</label>
        <input
          type="number"
          id="maxLevel"
          name="maxLevel"
          min="1"
          .value=${game.maxLevel}
        />

        <label for="game-img">Image:</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          .value=${game.imageUrl}
        />

        <label for="summary">Summary:</label>
        <textarea name="summary" id="summary" .value=${game.summary}></textarea>
        <input class="btn submit" type="submit" value="Edit Game" />
      </div>
    </form>
  </section>
`;

export const editPage = (ctx) => {
  ctx.render(editTemplate(ctx.game, onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const formData = [...new FormData(e.target).entries()];

    for (let [_, value] of formData) {
      if (value.trim() == "") {
        return alert("All fields are required!");
      }
    }

    const data = formData.reduce(
      (a, [k, v]) => Object.assign(a, { [k]: v.trim() }),
      {}
    );

    await editGame(ctx.params.id, data);

    ctx.page.redirect(`/details${ctx.params.id}`);
  }
};
