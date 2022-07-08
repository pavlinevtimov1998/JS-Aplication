import { towns } from "./towns.js";
import { html, render } from "./node_modules/lit-html/lit-html.js";

const container = document.querySelector("#towns");
const input = document.querySelector("#searchText");
const result = document.querySelector("#result");
const btn = document.querySelector("button");

btn.addEventListener("click", onSearch);
input.addEventListener("keyup", onSearch);

const townsObjects = towns.map((t) => ({ name: t, active: false }));

function start() {
  let townsTemplate = (towns) => html`
    <ul>
      ${towns.map(
        (t) => html`<li class=${t.active ? "active" : ""}>${t.name}</li>`
      )}
    </ul>
  `;

  render(townsTemplate(townsObjects), container);
}

function onSearch(e) {
  let match = input.value.trim().toLocaleLowerCase();
  let count = 0;

  townsObjects.forEach((t) => {
    if (t.name.toLocaleLowerCase().includes(match) && match !== "") {
      t.active = true;
      count++;
    } else {
      t.active = false;
    }
  });

  if (match !== "" && e.target.tagName !== "INPUT") {
    result.textContent = `${count} matches found`;
  } else {
    result.textContent = "";
  }

  start();
}

start();
