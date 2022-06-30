import { registerUser } from "./api-calls.js";
import { showCatalogue } from "./catalog.js";
import {
  activeNavButton,
  hideAll,
  userNavigation,
  userStorige,
} from "./util.js";

const registerSection = document.querySelector("#register");

export const showRegister = () => {
  hideAll();
  registerSection.style.display = "block";
};

const form = document.querySelector(".register-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(e.currentTarget);
  let email = data.get("email");
  let password = data.get("password");
  let rePass = data.get("rePass");

  if (password !== rePass) {
    return console.error("Passwords don't match");
  }

  const body = {
    email,
    password,
  };

  const user = await registerUser(body);

  userStorige(user);
  userNavigation();
  showCatalogue();
  activeNavButton();
});
