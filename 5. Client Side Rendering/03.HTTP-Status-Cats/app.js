import { html, render } from "./node_modules/lit-html/lit-html.js";
import { styleMap } from "./node_modules/lit-html/directives/style-map.js";
import { cats } from "./catSeeder.js";

cats.forEach((c) => (c.action = "Show"));

const container = document.querySelector("#allCats");

const template = (data) => html`
  <ul>
    ${data.map(
      (d) => html`
        <li>
          <div class="flex">
            <img
              src="./images/${d.imageLocation}.jpg"
              width="250"
              height="250"
              alt="Card image cap"
            />
            <div class="info">
              <button class="showBtn" @click=${(e) => onClick(e, d)}>
                ${d.action} status code
              </button>
              <div
                class="status"
                id=${d.id}
                style="${styleMap({
                  display: d.action == "Show" ? "none" : "block",
                })};"
              >
                <h4>Status Code: ${d.statusCode}</h4>
                <p>${d.statusMessage}</p>
              </div>
            </div>
          </div>
        </li>
      `
    )}
  </ul>
`;

function onClick(e, data) {
  data.action = data.action == "Show" ? "Hide" : "Show";

  onRender();
}

function onRender() {
  render(template(cats), container);
}

onRender();
