// navigating between pages

import { showHome } from "./home.js";
import { showLogin } from "./login.js";
import { showRegister } from "./register.js";

const navigation = document.querySelector("header nav");

const routes = {
  "/home": showHome,
  "/login": showLogin,
  "/register": showRegister,
};

navigation.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.tagName == "A") {
    const url = new URL(e.target);

    let showPage = routes[url.pathname];
    hideAll();
    showPage();
  }
});

function hideAll() {
  [...document.querySelector("main").children].forEach(
    (e) => (e.style.display = "none")
  );
}

showHome();
