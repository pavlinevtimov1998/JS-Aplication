const furnitureDataUrl = "http://localhost:3030/data/furniture";

const tBody = document.querySelector(".wrapper tbody");
const createForm = document.querySelector('form[method="post"]');
const createInputs = createForm.querySelectorAll("input");

createForm.addEventListener("submit", createFurniture);

async function createFurniture(e) {
  e.preventDefault();

  const user = JSON.parse(sessionStorage.getItem("user"));

  const dataForm = new FormData(e.target);

  const name = dataForm.get("name");
  const price = dataForm.get("price");
  const decFactor = dataForm.get("factor");
  const img = dataForm.get("img");

  if (name == "" || price == "" || decFactor == "" || img == "") {
    return alert("Incorrect data. Try again!");
  }

  const response = await fetch(furnitureDataUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": user.accessToken,
    },
    body: JSON.stringify({
      name,
      price,
      decFactor,
      img,
    }),
  });

  await getData();
}

async function getData() {
  tBody.innerHTML = "";

  try {
    const response = await fetch(furnitureDataUrl);

    if (response.status !== 200) {
      throw new Error("Not Work");
    }

    const data = await response.json();

    createTable(data);
  } catch (err) {
    alert(err.message);
  }
}

function createTable(data) {
  data.forEach((d) => {
    const tr = createElements("tr");
    const tdImg = createElements("td");
    const img = createElements("img");
    img.src = d.img;
    const tdName = createElements("td");
    const name = createElements("p", d.name);
    const tdPrice = createElements("td");
    const price = createElements("p", d.price);
    const tdDecFactor = createElements("td");
    const decFatcor = createElements("p", d.decFactor);
    const tdMark = createElements("td");
    const inputCheckbox = createElements("input", undefined, "checkbox");
    isUser(inputCheckbox);
    appending(
      [tdImg, tdName, tdPrice, tdDecFactor, tdMark],
      [img, name, price, decFatcor, inputCheckbox],
      tr,
      tBody
    );
  });
}

function appending(parentElemets, childElements, parent, parentTwo) {
  for (let i = 0; i < parentElemets.length; i++) {
    parentElemets[i].append(childElements[i]);
  }

  parentElemets.forEach((p) => parent.append(p));

  parentTwo.append(parent);
}

function createElements(el, content, type) {
  const element = document.createElement(el);

  if (content) {
    element.textContent = content;
  }

  if (type) {
    element.setAttribute("type", type);
  }
  return element;
}

function isUser(el) {
  let user = sessionStorage.getItem("user");

  if (user) {
    el.disabled = false;
  } else {
    el.disabled = true;
  }
}

getData();
