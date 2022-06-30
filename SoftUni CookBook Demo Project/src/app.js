import { showCatalogue } from "./catalog.js";
import { showCreate } from "./createRecipe.js";
import { showLogin } from "./login.js";
import { showRegister } from "./register.js";
import { activeNavButton, hideAll, rout, userNavigation } from "./util.js";

const nav = document.querySelector("nav");

hideAll();
showCatalogue();
userNavigation();

const router = {
  "/catalog": showCatalogue,
  "/create": showCreate,
  "/login": showLogin,
  "/register": showRegister,
  "/logout": logout,
};

nav.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.tagName == "A") {
    rout(e.target, router);
    activeNavButton();
  }
});

function logout() {
  sessionStorage.clear();
  userNavigation();
  showCatalogue();
  activeNavButton();
}
