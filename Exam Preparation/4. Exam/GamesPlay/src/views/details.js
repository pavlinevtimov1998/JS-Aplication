import { getGameDetails } from "../api/data.js";
import { html, until } from "../lib.js";
import { spinner } from "../util.js";

const detailsTemplate = (template) => html`
  <section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">
      ${until(template, spinner())}
      <div class="buttons">
        <a href="#" class="button">Edit</a>
        <a href="#" class="button">Delete</a>
      </div>
    </div>
  </section>
`;

const gameTemplate = (game) => html`
  <div class="game-header">
    <img class="game-img" src=${game.imageUrl} />
    <h1>${game.title}</h1>
    <span class="levels">MaxLevel: ${game.maxLevel}</span>
    <p class="type">${game.category}</p>
  </div>
  <p class="text">${game.summary}</p>
`;

export const detailsPage = (ctx) => {
  ctx.render(detailsTemplate(gameDetails()));

  async function gameDetails() {
    const game = await getGameDetails(ctx.params.id);

    return gameTemplate(game);
  }
};

const commentsTemplate = () => html`
  <!-- Bonus ( for Guests and Users ) -->
  <div class="details-comments">
    <h2>Comments:</h2>
    <ul>
      <!-- list all comments for current game (If any) -->
      <li class="comment">
        <p>Content: I rate this one quite highly.</p>
      </li>
      <li class="comment">
        <p>Content: The best game.</p>
      </li>
    </ul>
    <!-- Display paragraph: If there are no games in the database -->
    <p class="no-comment">No comments.</p>
  </div>
  <!-- Bonus -->
  <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
  <article class="create-comment">
    <label>Add new comment:</label>
    <form class="form">
      <textarea name="comment" placeholder="Comment......"></textarea>
      <input class="btn submit" type="submit" value="Add Comment" />
    </form>
  </article>
`;
