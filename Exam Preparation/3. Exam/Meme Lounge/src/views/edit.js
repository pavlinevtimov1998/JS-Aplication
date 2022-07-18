import { html, until } from "../lib.js";

const editTemplate = () => html`
  <section id="edit-meme">
    <form id="edit-form">
      <h1>Edit Meme</h1>
      <div class="container">
        <label for="title">Title</label>
        <input id="title" type="text" placeholder="Enter Title" name="title" />
        <label for="description">Description</label>
        <textarea
          id="description"
          placeholder="Enter Description"
          name="description"
        >
                            Programming is often touted as a smart and lucrative career path.
                            It's a job that (sometimes) offers flexibility and great benefits.
                            But it's far from sunshine and Nyan Cat rainbows. The hours are long.
                            The mistakes are frustrating. And your eyesight is almost guaranteed to suffer.
                            These memes cover most of the frustration (and funny moments) of programming.
                            At least we can laugh through the pain. 
                        </textarea
        >
        <label for="imageUrl">Image Url</label>
        <input
          id="imageUrl"
          type="text"
          placeholder="Enter Meme ImageUrl"
          name="imageUrl"
        />
        <input type="submit" class="registerbtn button" value="Edit Meme" />
      </div>
    </form>
  </section>
`;

export const editPage = (ctx) => {
  ctx.render(editTemplate());

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const title = formData.get("title");
    const description = formData.get("description");
    const imageUrl = formData.get("imageUrl");

    if (title == "" || description == "" || imageUrl == "") {
      return alert("All fields required!");
    }

    await createMeme({ title, description, imageUrl });

    ctx.page.redirect("/catalog");
  }
};
