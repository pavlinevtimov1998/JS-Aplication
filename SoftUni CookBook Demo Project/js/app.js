async function getRecipesInfo() {
  const url = `http://localhost:3030/data/recipes`;

  const response = await fetch(url);
  const data = response.json();

  return data;
}

function createRecipes(data) {
  const article = createElements("article", undefined, "preview");
  article.setAttribute("id", data._id);
  const divTitle = createElements("div", undefined, "title");
  const h2Title = createElements("h2", data.name);
  const divSmall = createElements("div", undefined, "small");
  const img = createElements("img");
  img.setAttribute("src", data.img);

  divTitle.append(h2Title);
  divSmall.append(img);

  article.append(divTitle, divSmall);

  article.addEventListener("click", loadDetailsFromClick);

  return article;
}

function recipesDetails(data, element) {
  const article = createElements("article");
  const h2Title = createElements("h2", data.name);
  const divBand = createElements("div", undefined, "band");
  const divThumb = createElements("div", undefined, "thumb");
  const img = createElements("img");
  img.setAttribute("src", data.img);
  const divIngredients = createElements("div", undefined, "ingredients");
  const h3Ingredients = createElements("h3", "Ingredients:");
  const ul = createElements("ul");
  data.ingredients.forEach((i) => {
    let liElement = createElements("li", i);
    ul.append(liElement);
  });
  divIngredients.append(h3Ingredients, ul);
  const divDescription = createElements("div", undefined, "description");
  const h3Desc = createElements("h3", "Preparation:");
  divDescription.append(h3Desc);
  data.steps.forEach((s) => {
    let p = createElements("p", s);
    divDescription.append(p);
  });
  divThumb.append(img);
  divBand.append(divThumb, divIngredients);
  article.append(h2Title, divBand, divDescription);

  article.addEventListener("click", (e) => {
    let curTarget = e.currentTarget;
    curTarget.replaceWith(element);
  });

  return article;
}

async function loadDetailsFromClick(e) {
  const url = `http://localhost:3030/data/recipes`;
  let id = e.currentTarget.id;
  let element = e.currentTarget;

  const response = await fetch(`${url}/${id}`);
  const data = await response.json();

  let article = recipesDetails(data, element);

  element.replaceWith(article);
}

function createElements(el, text, className) {
  let element = document.createElement(el);

  if (text) {
    element.textContent = text;
  }

  if (className) {
    element.classList.add(className);
  }

  return element;
}

function logOut() {
  const logOutBtn = document.getElementById('logoutBtn');
  logOutBtn.addEventListener('click', e => {

    user.style.display = "none";
    guest.style.display = "block";
    sessionStorage.clear();
  })
}

window.addEventListener("load", async () => {
  const main = document.querySelector("main");
  main.innerHTML = "";
  const guest = document.getElementById("guest");
  const user = document.getElementById("user");
  logOut();

  if (sessionStorage.getItem("authToken") != null) {
    user.style.display = "block";
    guest.style.display = "none";
  } else {
    guest.style.display = 'block';
  }

  const data = await getRecipesInfo();

  Object.values(data).forEach((d) => {
    let el = createRecipes(d);

    main.append(el);
  });
});
