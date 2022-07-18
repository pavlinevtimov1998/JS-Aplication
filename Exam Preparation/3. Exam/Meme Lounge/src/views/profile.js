import { allUserMemes } from "../api/data.js";
import { html, nothing } from "../lib.js";

const profileTemplate = (template, user, count) => html`
  <!-- Profile Page ( Only for logged users ) -->
  <section id="user-profile-page" class="user-profile">
    <article class="user-info">
      <img
        id="user-avatar-url"
        alt="user-profile"
        src="/images/${user.gender}.png"
      />
      <div class="user-content">
        <p>Username: ${user.username}</p>
        <p>Email: ${user.email}</p>
        <p>My memes count: ${count}</p>
      </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">${template}</div>
  </section>
`;

const memesTemplate = (meme) => html`
  <div class="user-meme">
    <p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl} />
    <a class="button" href="/details/${meme._id}">Details</a>
  </div>
`;

const noMemesTemplate = () => html`
  <p class="no-memes">No memes in database.</p>
`;

export const profilePage = (ctx) => {
  const user = ctx.userData();
  let count = 0;

  console.log(user);

  ctx.render(profileTemplate(html`<h1>Loading &hellip;</h1>`, user, count));

  async function userProfile() {
    const data = await allUserMemes(user.id);

    count = data.length;

    return data.length > 0
      ? ctx.render(
          profileTemplate(
            data.map((d) => memesTemplate(d)),
            user,
            count
          )
        )
      : ctx.render(profileTemplate(noMemesTemplate(), user, count));
  }

  userProfile();
};
