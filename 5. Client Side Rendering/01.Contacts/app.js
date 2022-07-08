import { html, render } from "./node_modules/lit-html/lit-html.js";
import { styleMap } from "./node_modules/lit-html/directives/style-map.js";
import { contacts } from "./contacts.js";

const container = document.querySelector("#contacts");

const contactTemplate = (data, onClick) => html`
  <div class="contact card">
    <div>
      <i class="far fa-user-circle gravatar"></i>
    </div>
    <div class="info">
      <h2>Name: ${data.name}</h2>
      <button class="detailsBtn" @click=${() => onClick(data)}>Details</button>
      <div
        class="details"
        id=${data.id}
        style=${styleMap({ display: data.details ? "block" : "none" })}
      >
        <p>Phone number: ${data.phoneNumber}</p>
        <p>Email: ${data.email}</p>
      </div>
    </div>
  </div>
`;

start();

function start() {
  function onClick(data) {
    data.details = !data.details;

    onRender();
  }

  function onRender() {
    render(
      contacts.map((d) => contactTemplate(d, onClick)),
      container
    );
  }

  onRender();
}
