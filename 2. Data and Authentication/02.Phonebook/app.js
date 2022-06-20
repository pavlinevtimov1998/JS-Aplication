const phonebook = document.getElementById("phonebook");
const person = document.getElementById("person");
const phone = document.getElementById("phone");

const loadBtn = document.getElementById("btnLoad");
const createBtn = document.getElementById("btnCreate");

loadBtn.addEventListener("click", loadPhonebook);
createBtn.addEventListener("click", createContact);

const url = "http://localhost:3030/jsonstore/phonebook";

async function load() {
  phonebook.innerHTML = "";

  const response = await fetch(url);
  const data = await response.json();

  Object.entries(data).forEach(([key, info]) => {
    const liElement = document.createElement("li");
    const btnDelete = document.createElement("button");
    btnDelete.textContent = "Delete";

    btnDelete.addEventListener("click", deleteContact);

    btnDelete.setAttribute("key", key);
    liElement.textContent = `${info.person}: ${info.phone}`;
    liElement.append(btnDelete);

    phonebook.append(liElement);
  });
}

async function loadPhonebook(e) {
  load();
}

async function deleteContact(e) {
  const urlDelete = "http://localhost:3030/jsonstore/phonebook";

  const response = await fetch(`${urlDelete}/${e.target.getAttribute("key")}`, {
    method: "DELETE",
  });

  e.target.parentNode.remove();
}

async function createContact(e) {
  if (person.value == "" || phone.value == "") {
    return;
  }

  const body = JSON.stringify({
    person: person.value,
    phone: phone.value,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body,
  });
  load();

  person.value = "";
  phone.value = "";
}
