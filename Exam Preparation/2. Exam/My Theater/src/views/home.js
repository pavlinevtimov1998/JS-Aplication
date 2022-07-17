import { allTheaters } from "../api/data.js";
import { html, until } from "../lib.js";

const homeTemplate = (events) => html`
  <section class="welcomePage">
    <div id="welcomeMessage">
      <h1>My Theater</h1>
      <p>
        Since 1962 World Theatre Day has been celebrated by ITI Centres, ITI
        Cooperating Members, theatre professionals, theatre organizations,
        theatre universities and theatre lovers all over the world on the 27th
        of March. This day is a celebration for those who can see the value and
        importance of the art form “theatre”, and acts as a wake-up-call for
        governments, politicians and institutions which have not yet recognised
        its value to the people and to the individual and have not yet realised
        its potential for economic growth.
      </p>
    </div>
    <div id="events">
      <h1>Future Events</h1>
      <div class="theaters-container">
        ${until(events, html`<h1>Loading &hellip;</h1>`)}
      </div>
    </div>
  </section>
`;

const eventsTemplate = (event) => html`
  <div class="eventsInfo">
    <div class="home-image">
      <img src="${event.imageUrl}" />
    </div>
    <div class="info">
      <h4 class="title">${event.title}</h4>
      <h6 class="date">${event.date}</h6>
      <h6 class="author">${event.author}</h6>
      <div class="info-buttons">
        <a class="btn-details" href="/details/${event._id}">Details</a>
      </div>
    </div>
  </div>
`;

const noEventsTemplate = () => html`
<h4 class="no-event">No Events Yet...</h4>
      </div>
    </div>
  </section>
`;

export const homePage = (ctx) => {
  ctx.render(homeTemplate(allEvents()));

  async function allEvents() {
    const data = await allTheaters();

    return data.length > 0
      ? data.map((d) => eventsTemplate(d))
      : noEventsTemplate();
  }
};
