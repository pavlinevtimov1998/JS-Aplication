import { getSearchedCars } from "../api/data.js";
import { html, until, nothing } from "../lib.js";

const searchTemplate = (search, template) => html`
  <section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
      <input
        id="search-input"
        type="text"
        name="search"
        placeholder="Enter desired production year"
      />
      <button @click=${search} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings">${template ? html`${template}` : nothing}</div>
  </section>
`;

const carTemplate = (car) => html`
  <div class="listing">
    <div class="preview">
      <img src=${car.imageUrl} />
    </div>
    <h2>${car.brand} ${car.model}</h2>
    <div class="info">
      <div class="data-info">
        <h3>Year: ${car.year}</h3>
        <h3>Price: ${car.price} $</h3>
      </div>
      <div class="data-buttons">
        <a href="/details/${car._id}" class="button-carDetails">Details</a>
      </div>
    </div>
  </div>
`;

const noCarTemplate = () => html` <p class="no-cars">No results.</p> `;

export const searchPage = (ctx) => {
  ctx.render(searchTemplate(search));

  async function search() {
    const input = document.querySelector("#search-input");

    const cars = await getSearchedCars(input.value);

    return cars.length > 0
      ? ctx.render(
          searchTemplate(
            search,
            cars.map((c) => carTemplate(c))
          )
        )
      : ctx.render(searchTemplate(search, noCarTemplate()));
  }
};
