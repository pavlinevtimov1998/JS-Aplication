import { searchByQuery } from "../api/data.js";
import { html, until, nothing } from "../lib.js";

const searchTemplate = (onSearch, result) => html`
  <section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
      <input
        id="search-input"
        type="text"
        name="search"
        placeholder="Enter desired albums's name"
      />
      <button @click=${(e) => onSearch(e)} class="button-list">Search</button>
    </div>
    ${result}
  </section>
`;

const resultTemplate = (items, ctx) => html`
  <h2>Results:</h2>
  <div class="search-result">
    ${items.map(
      (item) => html`<div class="card-box">
        <img src=${item.imgUrl} />
        <div>
          <div class="text-center">
            <p class="name">Name: ${item.name}</p>
            <p class="artist">Artist: ${item.artist}</p>
            <p class="genre">Genre: ${item.genre}</p>
            <p class="price">Price: ${item.price}</p>
            <p class="date">Release Date: ${item.releaseDate}</p>
          </div>
          ${ctx.userData() !== null
            ? html`<div class="btn-group">
            <a href="/details/${item._id}" id="details">Details</a>
          </div>
        </div>`
            : nothing}
        </div>
      </div>`
    )}
  </div>
`;

const noResults = () => html`<h2>Results:</h2>
  <div class="search-result"><p class="no-result">No result.</p></div>`;

export const searchPage = (ctx) => {
  ctx.render(searchTemplate(onSearch));

  async function onSearch(e) {
    const input = e.target.parentNode.children[0];

    const query = encodeURIComponent(input.value);

    const data = await searchByQuery(query);

    data.length > 0
      ? ctx.render(searchTemplate(onSearch, resultTemplate(data, ctx)))
      : ctx.render(searchTemplate(onSearch, noResults()));
  }
};
