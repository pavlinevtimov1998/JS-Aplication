import { showCatalogue } from "./catalog.js";
import { hideAll, userNavigation, spinner } from "./util.js";
import { createElements } from "./dom-el.js";
import { showCreate } from "./createRecipe.js";
import { showLogin } from "./login.js";
import { showRegister } from "./register.js";
import { logout } from "./api/data.js";

const nav = document.querySelector("nav");

hideAll();
userNavigation();

const views = {
  catalog: showCatalogue,
  create: showCreate,
  login: showLogin,
  register: showRegister,
  logout: logetOut,
};

const route = {
  "/catalog": "catalog",
  "/create": "create",
  "/login": "login",
  "/register": "register",
  "/logout": "logout",
};

const ctx = {
  hideAll,
  userNavigation,
  goTo,
  spinner,
  createElements,
};

nav.addEventListener("click", (e) => {
  e.preventDefault();

  let url = new URL(e.target.href);
  let view = views[route[url.pathname]];
  if (typeof view == "function") {
    hideAll();
    view(ctx);
  }
});

function goTo(name, ...params) {
  let view = views[name];
  if (typeof view == "function") {
    view(...params);
  }
}

async function logetOut() {
  await logout();
  hideAll();
  userNavigation();
  goTo("catalog", ctx);
}

showCatalogue(ctx);
