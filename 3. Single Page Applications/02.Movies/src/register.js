import { registerRequest } from "./api-calls.js";
import { showHome } from "./home.js";
import { navAction, userStorage } from "./util.js";

const registerPage = document.querySelector("#form-sign-up");
const form = registerPage.querySelector("form");

export const showRegister = () => {
  registerPage.style.display = "block";
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let formData = new FormData(e.currentTarget);

  let [email, password, rePass] = [...formData.values()];

  if (email == "" || password.length < 6 || password !== rePass) {
    return alert("Incorrect input");
  }

  const user = await registerRequest({ email, password });
  console.log(user);

  userStorage(user);
  showHome();
  navAction(user);
});
