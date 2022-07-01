import { showCreate } from "./create.js";
import { showHome } from "./home.js";
import { showLogin } from "./login.js";
import { showRegister } from "./register.js";
import { hideAll, navAction, userStorige } from "./util.js";

hideAll();
navAction(userStorige());
showHome();

const route = {
  "/movies": showHome,
  "/login": showLogin,
  "/register": showRegister,
  "/create": showCreate,
};

document.querySelector(".navbar").addEventListener("click", navigate);
document.querySelector("#add-movie-button").addEventListener("click", navigate);

function navigate(e) {
  e.preventDefault();

  if (e.target.tagName == "A" && e.target.href) {
      let url = new URL(e.target.href);
      let show = route[url.pathname];
    if (typeof show == "function") {
      hideAll();
      show();
    }
  }
}
