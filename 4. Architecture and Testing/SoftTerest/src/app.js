import { showCatalog } from "./views/catalog.js";
import { showCreate } from "./views/create.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";
import { showHome } from "./views/home.js";
import { createElements, spinner } from "./util.js";
import { showDetails } from "./views/details.js";
import { logout } from "./api/data.js";
import { showSection } from "./util.js";

const navBar = document.querySelector(".navbar-nav");
const userNav = navBar.querySelectorAll(".user");
const guestNav = navBar.querySelectorAll(".guest");

const views = {
  home: showHome,
  catalog: showCatalog,
  create: showCreate,
  login: showLogin,
  register: showRegister,
  details: showDetails,
};

const ctx = {
  showSection,
  navAction,
  goTo,
  createElements,
  spinner,
};

navBar.addEventListener("click", (e) => {
  if (e.target.tagName == "A") {
    e.preventDefault();
    if (e.target.textContent == "Logout") {
      logetOut();
    } else {
      goTo(e.target.id, ctx);
    }
  }
});

function goTo(name, ...params) {
  let view = views[name];
  if (typeof view == "function") {
    view(...params);
  }
}

function navAction() {
  let user = sessionStorage.getItem("userData");

  if (user) {
    userNav[0].style.display = "block";
    userNav[1].style.display = "block";
    guestNav[0].style.display = "none";
    guestNav[1].style.display = "none";
  } else {
    userNav[0].style.display = "none";
    userNav[1].style.display = "none";
    guestNav[0].style.display = "block";
    guestNav[1].style.display = "block";
  }
}

async function logetOut() {
  await logout();
  navAction();
  goTo("home", ctx);
}

navAction();
goTo("home", ctx);
