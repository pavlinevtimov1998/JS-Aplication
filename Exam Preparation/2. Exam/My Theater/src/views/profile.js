import { getUserTheaters } from "../api/data.js";
import { html, until } from "../lib.js";

const profileTemplate = (template, user) => html`
  <section id="profilePage">
    <div class="userInfo">
      <div class="avatar">
        <img src="./images/profilePic.png" />
      </div>
      <h2>${user.email}</h2>
    </div>
    <div class="board">${until(template, html`<h1>Loading &hellip;</h1>`)}</div>
  </section>
`;

const eventsTemplate = (theater) => html`
  <div class="eventBoard">
    <div class="event-info">
      <img src=${theater.imageUrl} />
      <h2>${theater.title}</h2>
      <h6>${theater.date}</h6>
      <a href="details/${theater._id}" class="details-button">Details</a>
    </div>
  </div>
`;

const noEventsTemplate = () => html`
<div class="no-events">
        <p>This user has no events yet!</p>
      </div>
    </div>
  </section>
`;

export const profilePage = (ctx) => {
  const user = ctx.userData();

  ctx.render(profileTemplate(getUserEvents(), user));

  async function getUserEvents() {
    const data = await getUserTheaters(user.id);

    return data.length > 0
      ? data.map((d) => eventsTemplate(d))
      : noEventsTemplate();
  }
};
