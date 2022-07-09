import { html, render } from "./node_modules/lit-html/lit-html.js";
import { getRequest, postRequest } from "./api.js";

const menu = document.querySelector("#menu");
const form = document.querySelector("form");

const template = (data) => html`
  ${data.map((t) => html`<option value=${t._id}>${t.text}</option>`)}
`;

async function fillMenu() {
  const data = await (await getRequest()).json();

  render(template(Object.values(data)), menu);
}

fillMenu();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const text = formData.get("text");

  postRequest({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  fillMenu();

  form.reset();
});
