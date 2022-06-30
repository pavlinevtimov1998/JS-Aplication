import { loginUser } from "./api-calls.js";
import { showCatalogue } from "./catalog.js";
import { activeNavButton, hideAll, userNavigation, userStorige } from "./util.js";

const loginSection = document.querySelector("#login");
const form = document.querySelector(".login-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(e.currentTarget);
  const email = data.get("email");
  const password = data.get("password");

  const body = {
    email,
    password,
  };

  const user = await loginUser(body);
  userStorige(user);
  userNavigation();
  showCatalogue();
  activeNavButton();
});

export const showLogin = () => {
  hideAll();
  loginSection.style.display = "block";
};
