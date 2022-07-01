import { loginRequest } from "./api-calls.js";
import { showHome } from "./home.js";
import { navAction, userStorage } from "./util.js";

const loginPage = document.querySelector("#form-login");

export const showLogin = () => {
  loginPage.style.display = "block";
};

loginPage.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  let formData = new FormData(e.currentTarget);

  let email = formData.get("email");
  let password = formData.get("password");

  let user = await loginRequest({ email, password });

  userStorage(user);
  showHome();
  navAction();
});
