window.addEventListener("load", loadStudents);

const url = "http://localhost:3030/jsonstore/collections/students";

const form = document.getElementById("form");
const table = document.querySelector("#results tbody");

async function loadStudents() {
  table.innerHTML = "";

  const response = await fetch(url);
  const data = await response.json();

  Object.values(data).forEach((d) => {
    createTable([d.firstName, d.lastName, d.facultyNumber, d.grade]);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(e.currentTarget);
  const firstName = data.get("firstName");
  const lastName = data.get("lastName");
  const facultyNumber = data.get("facultyNumber");
  const grade = data.get("grade");

  if (firstName == "" || lastName == "" || facultyNumber == "" || grade == "") {
    return;
  }

  const body = JSON.stringify({
    firstName,
    lastName,
    facultyNumber,
    grade,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body,
  });

  loadStudents();

  [...form.children[1].children].forEach((e) => (e.value = ""));
});

function createTable(data) {
  const tr = createElements("tr");

  data.forEach((e) => {
    const td = createElements("td", e);
    tr.append(td);
  });

  table.append(tr);
}

function createElements(el, text) {
  let element = document.createElement(el);

  if (text) {
    element.textContent = text;
  }

  return element;
}
