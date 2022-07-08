import { html, render } from "./node_modules/lit-html/lit-html.js";

const template = (towns) => html`
  <ul>
    ${towns.map((t) => html`<li>${t}</li>`)}
  </ul>
`;

const container = document.querySelector("#root");

document.querySelector(".content").addEventListener("submit", (e) => {
  e.preventDefault();
  let data = new FormData(e.currentTarget);
  let towns = data.get("towns").split(", ");

  render(template(towns), container);
});
