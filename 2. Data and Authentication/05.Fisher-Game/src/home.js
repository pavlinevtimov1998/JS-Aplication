const home = document.querySelector(".home-view");
const fieldset = document.querySelector("#main");
const catchesContainer = fieldset.querySelector("#catches");

export function showHome() {
  home.style.display = "block";
}

document.querySelector(".load").addEventListener("click", loading);

const allCatchesUrl = "http://localhost:3030/data/catches";

async function loading(e) {
  e.preventDefault();

  showAndHideContainer();

  const response = await fetch(allCatchesUrl);
  const data = await response.json();

  if (data.length > 0) {
    createCatches(data);
  }
}

function createCatches(data) {
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
    btnUpdate.setAttribute("data-id", d._id);
    // btnUpdate.addEventListener('click', updateCatch);
    const btnDelete = createElements("button", "Delete", "delete");
    btnDelete.setAttribute("data-id", d._id);
    // btnDelete.addEventListener('click', deleteCatch);
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
