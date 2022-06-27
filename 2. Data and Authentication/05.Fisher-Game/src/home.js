import { addShowing, updateNav } from "./utill.js";

const home = document.querySelector(".home-view");
const fieldset = document.querySelector("#main");
const catchesContainer = fieldset.querySelector("#catches");
const navigation = document.querySelector("nav");
const addForm = home.querySelector("#addForm fieldset");

const addBtn = addForm.querySelector("button");
addBtn.addEventListener("click", addingCatche);

const allCatchesUrl = "http://localhost:3030/data/catches";

async function addingCatche(e) {
  e.preventDefault();

  let user = JSON.parse(sessionStorage.getItem("user"));

  let angler = addForm.children[2].value;
  let weight = addForm.children[4].value;
  let species = addForm.children[6].value;
  let location = addForm.children[8].value;
  let bait = addForm.children[10].value;
  let captureTime = addForm.children[12].value;

  if (
    angler == "" ||
    weight == "" ||
    species == "" ||
    location == "" ||
    bait == "" ||
    captureTime == ""
  ) {
    return;
  }

  const response = await fetch(allCatchesUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": user.accessToken,
    },
    body: JSON.stringify({
      angler,
      weight,
      species,
      location,
      bait,
      captureTime,
    }),
  });

  await loading(e);
}

export function showHome() {
  home.style.display = "block";
  updateNav(navigation);
  addShowing(addBtn);
}
document.querySelector(".load").addEventListener("click", (e) => loading(e));

async function loading(e) {
  e.preventDefault();

  showAndHideContainer();

  const response = await fetch(allCatchesUrl);
  const data = await response.json();

  if (data.length > 0) {
    loadingCatches(data);
  } else {
    home.children[0].textContent = "Click to load catches";
  }
}

function loadingCatches(data) {
  data.forEach((d) => {
    const div = createElements("div", undefined, "catch");
    const label = createElements("label", "Angler");
    const inputName = createElements(
      "input",
      d.angler,
      "angler",
      undefined,
      "text"
    );
    const labelWeight = createElements("label", "Weight");
    const inputWeight = createElements(
      "input",
      d.weight,
      "weight",
      undefined,
      "text"
    );
    const labelSpecies = createElements("label", "Spacies");
    const inputSpecies = createElements(
      "input",
      d.species,
      "species",
      undefined,
      "text"
    );

    const labelLocation = createElements("label", "Location");
    const inputLocation = createElements(
      "input",
      d.location,
      "location",
      undefined,
      "text"
    );

    const labelBait = createElements("label", "Bait");
    const inputBait = createElements(
      "input",
      d.bait,
      "bait",
      undefined,
      "text"
    );
    const labelCapture = createElements("label", "Capture Time");
    const inputCapture = createElements(
      "input",
      d.captureTime,
      "captureTime",
      undefined,
      "number"
    );
    const btnUpdate = createElements("button", "Update", "update");
    btnUpdate.setAttribute("data-id", d._ownerId);
    btnUpdate.addEventListener("click", (e) =>
      catchAction(
        e,
        inputName.value,
        inputWeight.value,
        inputSpecies.value,
        inputLocation.value,
        inputBait.value,
        inputCapture.value,
        d._id
      )
    );
    const btnDelete = createElements("button", "Delete", "delete");
    btnDelete.setAttribute("data-id", d._ownerId);
    btnDelete.addEventListener("click", (e) =>
      catchAction(
        e,
        inputName.value,
        inputWeight.value,
        inputSpecies.value,
        inputLocation.value,
        inputBait.value,
        inputCapture.value,
        d._id
      )
    );
    isCreator(btnUpdate, btnDelete);
    div.append(
      label,
      inputName,
      labelWeight,
      inputWeight,
      labelSpecies,
      inputSpecies,
      labelLocation,
      inputLocation,
      labelBait,
      inputBait,
      labelCapture,
      inputCapture,
      btnUpdate,
      btnDelete
    );
    catchesContainer.append(div);
  });

  home.children[0].style.display = "none";
  fieldset.style.display = "inline-table";
}

async function catchAction(
  e,
  angler,
  weight,
  species,
  location,
  bait,
  captureTime,
  id
) {
  e.preventDefault();

  if (e.target.textContent == "Update") {
    await updateCatche(
      angler,
      weight,
      species,
      location,
      bait,
      captureTime,
      id
    );
  } else if (e.target.textContent == "Delete") {
    await deleteCatche(id);
  }
  await loading(e);
}

async function deleteCatche(id) {
  let user = JSON.parse(sessionStorage.getItem("user"));

  const response = await fetch(`${allCatchesUrl}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": user.accessToken,
    },
  });
}

async function updateCatche(
  angler,
  weight,
  species,
  location,
  bait,
  captureTime,
  id
) {
  let user = JSON.parse(sessionStorage.getItem("user"));

  const response = await fetch(`${allCatchesUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": user.accessToken,
    },
    body: JSON.stringify({
      angler,
      weight,
      species,
      location,
      bait,
      captureTime,
    }),
  });
}

function isCreator(elOne, elTwo) {
  let user = JSON.parse(sessionStorage.getItem("user"));
  console.log(user);

  if (user && elOne.dataset.id == user._id) {
    elOne.disabled = false;
    elTwo.disabled = false;
  } else {
    elOne.disabled = true;
    elTwo.disabled = true;
  }
}

function showAndHideContainer() {
  fieldset.style.display = "none";
  catchesContainer.innerHTML = "";
  home.children[0].style.display = "block";
  home.children[0].textContent = "Loading...";
}

function createElements(el, content, classN, id, type) {
  let element = document.createElement(el);

  if (content) {
    if (el == "input") {
      element.value = content;
    } else {
      element.textContent = content;
    }
  }

  if (classN) {
    element.className = classN;
  }

  if (id) {
    element.id = id;
  }

  if (type) {
    element.type = type;
  }

  return element;
}
