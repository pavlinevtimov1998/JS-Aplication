const views = document.querySelector("#views");

const userNav = document.querySelector("#user");
const guestNav = document.querySelector("#guest");

export const rout = (target, router) => {
  const url = new URL(target.href);
  let action = router[url.pathname];
  action();

  return url.pathname;
};

export const activeNavButton = () => {
  [...views.children].forEach((ch) => {
    if (ch.style.display == "block") {
      document.querySelector(".active").classList.remove("active");
      document.querySelector(`a[href="/${ch.id}"]`).classList.add("active");
    }
  });
};

export const userNavigation = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  if (user) {
    userNav.style.display = "inline-block";
    guestNav.style.display = "none";
  } else {
    userNav.style.display = "none";
    guestNav.style.display = "inline-block";
  }
};

export const hideAll = () =>
  [...views.children].forEach((ch) => (ch.style.display = "none"));

export const userStorige = (user, id, command) => {
  if (user) {
    sessionStorage.setItem("user", JSON.stringify(user));
    return;
  }
  let u = JSON.parse(sessionStorage.getItem("user"));

  if (id) {
    return u.id;
  } else if (command) {
    return u;
  } else {
    return u.accessToken;
  }
};

export async function creatingOrEditingRecipe(e, request, catalog, id) {
  e.preventDefault();

  const data = new FormData(e.currentTarget);

  const name = data.get("name");
  const img = data.get("img");
  const ingredients = data.get("ingredients").split("\n");
  const steps = data.get("steps").split("\n");

  if (name == "" || img == "" || ingredients == "" || steps == "") {
    return alert("Empty inputs!");
  }

  const body = {
    name,
    img,
    ingredients,
    steps,
  };

  const accessToken = userStorige();

  id == undefined
    ? await request(body, undefined, accessToken)
    : await request(body, id, accessToken);

  hideAll();
  catalog();
  activeNavButton();
}
