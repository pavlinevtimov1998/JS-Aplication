import { showCreate } from "./views/create.js";
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";
import {
  hideAll,
  isUser,
  navAction,
  spinner,
  createElements,
  userStorage,
} from "./util.js";
import { logout } from "./api/data.js";

hideAll();
navAction(isUser());

const views = {
  home: showHome,
  login: showLogin,
  register: showRegister,
  create: showCreate,
};

const route = {
  "/movies": "home",
  "/login": "login",
  "/register": "register",
  "/create": "create",
};

const ctx = {
  hideAll,
  navAction,
  isUser,
  goTo,
  spinner,
  createElements,
  userStorage,
};

document.querySelector(".navbar").addEventListener("click", navigate);
document.querySelector("#add-movie-button").addEventListener("click", navigate);

document
  .querySelector('a[href="/logout"]')
  .addEventListener("click", async (e) => {
    e.preventDefault();

    await logout();
    sessionStorage.removeItem("userData");
    navAction(isUser());
    views.login(ctx);
  });

function navigate(e) {
  e.preventDefault();

  if (e.target.tagName == "A" && e.target.href) {
    let url = new URL(e.target.href);
    let view = views[route[url.pathname]];
    if (typeof view == "function") {
      hideAll();
      view(ctx);
    }
  }
}

function goTo(name, ...params) {
  let view = views[name];
  if (typeof view == "function") {
    view(...params);
  }
}

showHome(ctx);
