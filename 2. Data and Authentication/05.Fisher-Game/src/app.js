import { showHome } from "./home.js";
import { showLogin } from "./login.js";
import { logout } from "./logout.js";
import { showRegister } from "./register.js";
import { updateNav } from "./router.js";

const navigation = document.querySelector("header nav");

const routes = {
  "/home": showHome,
  "/login": showLogin,
  "/register": showRegister,
  "/logout": logout,
};

navigation.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.tagName == "A") {
    document.querySelector(".active").classList.remove("active");

    const url = new URL(e.target);

    e.target.classList.add("active");

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

updateNav(navigation);
showHome();
