import { getById, updateById } from "../api/data.js";
import { html, until } from "../lib.js";

const updateTemplate = (form) =>
  html`
    <section class="editPage">
      ${until(form, html`<p>Loading &hellip;</p>`)}
    </section>
  `;

const formTemplate = (item, onSubmit) => html`
  <form @submit=${(e) => onSubmit(e)}>
    <fieldset>
      <legend>Edit Album</legend>

      <div class="container">
        <label for="name" class="vhide">Album name</label>
        <input
          id="name"
          name="name"
          class="name"
          type="text"
          .value=${item.name}
        />

        <label for="imgUrl" class="vhide">Image Url</label>
        <input
          id="imgUrl"
          name="imgUrl"
          class="imgUrl"
          type="text"
          .value=${item.imgUrl}
        />

        <label for="price" class="vhide">Price</label>
        <input
          id="price"
          name="price"
          class="price"
          type="text"
          .value=${item.price}
        />

        <label for="releaseDate" class="vhide">Release date</label>
        <input
          id="releaseDate"
          name="releaseDate"
          class="releaseDate"
          type="text"
          .value=${item.releaseDate}
        />

        <label for="artist" class="vhide">Artist</label>
        <input
          id="artist"
          name="artist"
          class="artist"
          type="text"
          .value=${item.artist}
        />

        <label for="genre" class="vhide">Genre</label>
        <input
          id="genre"
          name="genre"
          class="genre"
          type="text"
          .value=${item.genre}
        />

        <label for="description" class="vhide">Description</label>
        <textarea name="description" class="description" rows="10" cols="10">
${item.description}</textarea
        >

        <button class="edit-album" type="submit">Edit Album</button>
      </div>
    </fieldset>
  </form>
`;

export const updatePage = (ctx) => {
  ctx.render(updateTemplate(getItem(ctx)));
};

async function getItem(ctx) {
  const item = await getById(ctx.params.id);

  return formTemplate(item, onSubmit.bind(null, ctx));
}

async function onSubmit(ctx, e) {
  e.preventDefault();

  const formData = [...new FormData(e.target).entries()];

  const missing = formData.filter(([k, v]) => v.trim() == "");

  if (missing.length > 0) {
    return alert("All fields required!");
  }

  const data = formData.reduce(
    (a, [k, v]) => Object.assign(a, { [k]: v.trim() }),
    {}
  );

  await updateById(ctx.params.id, data);

  ctx.page.redirect(`/details/${ctx.params.id}`);
}
