import { html, render } from "./node_modules/lit-html/lit-html.js";

const url = "http://localhost:3030/jsonstore/advanced/table";

const container = document.querySelector(".container tbody");
const input = document.querySelector("#searchField");

const template = (data) =>
  data.map(
    (d) => html`<tr class=${d.select ? "select" : ""}>
      <td>${d.firstName} ${d.lastName}</td>
      <td>${d.email}</td>
      <td>${d.course}</td>
    </tr> `
  );

async function fillTable() {
  const response = await fetch(url);
  const data = await response.json();

  document.querySelector("#searchBtn").addEventListener("click", onClick);

  function onClick(e) {
    let match = input.value.trim().toLocaleLowerCase();

    if (match == "") {
      return;
    }

    Object.values(data).forEach((d) => {
      let isMatch = false;
      Object.values(d).forEach((v) => {
        if (typeof v == "string" && v.toLocaleLowerCase().includes(match)) {
          d.select = true;
          isMatch = true;
        } else if (isMatch == false) {
          d.select = false;
        }
      });
    });

    input.value = "";

    render(template(Object.values(data)), container);
  }

  render(template(Object.values(data)), container);
}

fillTable();
